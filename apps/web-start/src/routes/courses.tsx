import { createFileRoute, Link } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { CourseCreateIn, CourseOut, CourseUpdateIn } from '../../../../packages/api/src/index';

type Course = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  instructorId: string;
};

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [formData, setFormData] = useState({ id: '', title: '', description: '',instructorId:'' });
  const queryClient = useQueryClient();
  const getModalClass = () => {
    switch (showModal) {
        case 'create':
            return 'modal-create';
        case 'update':
            return 'modal-update';
        case 'delete':
            return 'modal-delete';
        default:
            return '';
    }
  };
  // === Fetch Courses ===
  useEffect(() => {
    const fetchCourses = async () => {
      const fetched = backendFetcher<Course[]>('/course');
      const data = await fetched();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  // === Mutations ===
  const createMutation = useMutation({
    mutationFn: async () => {
      const payload: CourseCreateIn = {
        title: formData.title,
        description: formData.description,
        instructorId: 1, // replace if you have auth
      };
      await mutateBackend('/course', 'POST', payload);
    },
    onSuccess: async () => {
      alert('Course created successfully!');
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const payload: CourseUpdateIn = {
      
        title: formData.title,
        description: formData.description,
      };
      await mutateBackend(`/course/${formData.id}`, 'PUT', payload);
    },
    onSuccess: async () => {
      alert('Course updated successfully!');
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await mutateBackend(`/course/${formData.id}`, 'DELETE');
    },
    onSuccess: async () => {
      alert('Course deleted successfully!');
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return (
    <div className="dashboard-container">
      {/* === SIDEBAR === */}
      <div className="sidebar">
      <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="main-content">
        <div className="CreateCourseButton">
          <button onClick={() => setShowModal('create')}>Create Course</button>
        </div>
        <br></br>
        <div className = "UpdateCourseButton">
            <button onClick={() => setShowModal('update')}>Update Course</button>
        </div>
        <br></br>
        <div className = "DeleteCourseButton">
        <button onClick={() => setShowModal('delete')}>Delete Course</button>
        </div>
        <br></br>
        <h1 className="courses-title">Courses</h1>
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>

        {/* === POPUP === */}
{showModal && (
  <div className="modal-overlay">
    <div className={getModalClass()}>
      <h2>
        {showModal === 'create'
          ? 'Create Course'
          : showModal === 'update'
          ? 'Update Course'
          : 'Delete Course'}
      </h2>

      {/* === CREATE FORM === */}
      {showModal === 'create' && (
        <>
        
          <input
            type="text"
            placeholder="Instructor ID"
            value={formData.instructorId || ''}
            onChange={(e) => setFormData({ ...formData, instructorId: (e.target.value) })}
          />
          <br></br>
          <input
            type="text"
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <br></br>
          <input
            type="text"
            placeholder="Course Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <br></br>
        </>
      )}

      {/* === UPDATE FORM === */}
      {showModal === 'update' && (
        <>
          <input
            type="text"
            placeholder="Course ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: (e.target.value) })}
          />
          <br></br>
          <input
            type="text"
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <br></br>
          <input
            type="text"
            placeholder="Course Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <br></br>
        </>
      )}

      {/* === DELETE FORM === */}
      {showModal === 'delete' && (
        <>
          <input
            type="text"
            placeholder="Course ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id:(e.target.value) })}
          />
          <br></br>
        </>
      )}

      {/* === BUTTONS === */}
      <div className="modal-buttons">
        {showModal === 'create' && (
          <button onClick={() => createMutation.mutate()}>Submit</button>
        )}
        {showModal === 'update' && (
          <button onClick={() => updateMutation.mutate()}>Submit</button>
        )}
        {showModal === 'delete' && (
          <button onClick={() => deleteMutation.mutate()}>Submit</button>
        )}
        <button onClick={() => setShowModal(null)}>Cancel</button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
