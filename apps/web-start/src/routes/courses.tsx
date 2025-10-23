import { createFileRoute, Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { CourseCreateIn, CourseUpdateIn } from '../../../../packages/api/src/index';

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
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [formData, setFormData] = useState({ id: '', title: '', description: '', instructorId: '' });

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

  // === Fetch all courses ===
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const fetchCourses = backendFetcher<Course[]>('/course');
      return await fetchCourses();
    },
  });

  // === Mutations ===
  const createMutation = useMutation({
    mutationFn: async () => {
      const payload: CourseCreateIn = {
        title: formData.title,
        description: formData.description,
        instructorId: 5, // placeholder
      };
      await mutateBackend('/course', 'POST', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setShowModal(null);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setShowModal(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await mutateBackend(`/course/${formData.id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setShowModal(null);
    },
  });

  // === Loading/Error UI ===
  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error loading courses: {(error as Error)?.message}</p>;

  return (
    <div className="dashboard-container">
      {/* === SIDEBAR === */}
      <div className="sidebar">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/courses">Courses</Link>
        <Link className="nav-link" to="/calendar">Calendar</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/inbox">Inbox</Link>
        <Link className="logout" to="/">Log out</Link>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="main-content">
        <div className="button-bar">
          <button onClick={() => setShowModal('create')}>Create Course</button>
          <button onClick={() => setShowModal('update')}>Update Course</button>
          <button onClick={() => setShowModal('delete')}>Delete Course</button>
        </div>

        <h1 className="courses-title">All Courses</h1>

        {/* === COURSE LIST === */}
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="course-list">
            {courses.map((course) => (
              <div key={course.id} className="course-item">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <small>
                  Instructor ID: {course.instructorId} | Created:{' '}
                  {new Date(course.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* === MODAL === */}
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

              {/* === FORM INPUTS === */}
              {(showModal === 'create' || showModal === 'update') && (
                <>
                  {showModal === 'update' && (
                    <>
                      <input
                        type="text"
                        placeholder="Course ID"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      />
                      <br />
                    </>
                  )}
                  {showModal === 'create' && (
                    <>
                      <input
                        type="text"
                        placeholder="Instructor ID"
                        value={formData.instructorId}
                        onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                      />
                      <br />
                    </>
                  )}
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <br />
                  <textarea
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <br />
                </>
              )}

              {showModal === 'delete' && (
                <>
                  <input
                    type="text"
                    placeholder="Course ID"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  />
                  <br />
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
