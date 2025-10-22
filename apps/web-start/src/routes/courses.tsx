import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { mutateBackend } from '/Users/sistalways/f25-cisc474-sistalways/apps/web-start/src/integrations/fetcher';
import {CourseRef, CourseUpdateIn, CourseCreateIn,CourseOut} from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/courses/dto/courses.dto';
import { backendFetcher } from '/Users/sistalways/f25-cisc474-sistalways/apps/web-start/src/integrations/fetcher';
import { Link } from '@tanstack/react-router';
type Course = {
  id          :string;      
  title      : string;
  description: string;
  createdAt  : Date;    
  updatedAt  : Date;    
  //user        User @relation(fields: [instructorId], references: [id])
  instructorId :string;

  enrollments : string[];
  assignments : string[];

  User : string[];
}

async function CoursesList(){
  const fetched = backendFetcher<Course[]>('/course');
  const courses = await fetched();
  return (
    <div className="courses-container">
      <h1 className="courses-title">Courses</h1>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseModal({
  mode,
  onClose,
  onConfirm,
}: {
  mode: 'create' | 'update' | 'delete'
  onClose: () => void
  onConfirm: (course: Partial<Course>) => void
}) {
  const [form, setForm] = useState<Partial<Course>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onConfirm(form)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">
          {mode === 'create'
            ? 'Create New Course'
            : mode === 'update'
            ? 'Update Course'
            : 'Delete Course'}
        </h2>

        {(mode === 'create' || mode === 'update') && (
          <>
            <input
              name="id"
              placeholder="Course ID"
              className="input"
              onChange={handleChange}
            />
            <input
              name="title"
              placeholder="Course Title"
              className="input"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Course Description"
              className="input"
              onChange={handleChange}
            />
          </>
        )}

        {mode === 'delete' && (
          <input
            name="id"
            placeholder="Enter Course ID to delete"
            className="input"
            onChange={handleChange}
          />
        )}

        <div className="modal-buttons">
          <button onClick={handleSubmit} className="confirm-btn">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// === MAIN ROUTE COMPONENT ===
export const Route = createFileRoute('/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  const [modalMode, setModalMode] = useState<'create' | 'update' | 'delete' | null>(null)

  const handleConfirm = async (course: Partial<Course>) => {
    try {
      if (modalMode === 'create') {
        await mutateBackend('https://f25-cisc474-sistalways.onrender.com', 'POST', course)
      } else if (modalMode === 'update') {
        await mutateBackend(`https://f25-cisc474-sistalways.onrender.com/courses/${course.id}`, 'PUT', course)
      } else if (modalMode === 'delete') {
        await mutateBackend(`https://f25-cisc474-sistalways.onrender.com/${course.id}`, 'DELETE')
      }
      window.location.reload()
    } catch (err) {
      console.error(`Failed to ${modalMode} course:`, err)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
      <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
      </div>

      <div className="main-content">
        <h1>Courses</h1>
        <div className = 'CreateCourseButton'>
          <button  onClick={() => setModalMode('create')}>Create Course</button>
        </div>
        <div className = 'UpdateCourseButton'>
           <button  onClick={() => setModalMode('update')}>Update Course</button>
        </div>
        <div className = 'DeleteCourseButton'>
            <button  onClick={() => setModalMode('delete')}>Delete Course</button>
        </div>
        <CoursesList/>
        
      </div>

      {modalMode && (
        <CourseModal
          mode={modalMode}
          onClose={() => setModalMode(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
