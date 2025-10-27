import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useApiQuery, useApiMutation } from '../integrations/api';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '../../../../packages/api/src/index';
import LogOutButton from '../components/LogOutButton';

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    instructorId: '',
  });

  const resetForm = () => setFormData({ id: '', title: '', description: '', instructorId: '' });

  const getModalClass = () => {
    switch (showModal) {
      case 'create': return 'modal-create';
      case 'update': return 'modal-update';
      case 'delete': return 'modal-delete';
      default: return '';
    }
  };

  // === Fetch all courses (using secured API) ===
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    isAuthPending,
  } = useApiQuery<CourseOut[]>(['courses'], '/course');

  // === Create mutation ===
  const createMutation = useApiMutation<CourseCreateIn, CourseOut>({
    path: '/course',
    method: 'POST',
    invalidateKeys: [['courses']],
  });

  // === Update mutation ===
  const updateMutation = useApiMutation<CourseUpdateIn, CourseOut>({
    endpoint: (variables) => ({
      path: `/course/${formData.id}`,
      method: 'PUT',
    }),
    invalidateKeys: [['courses']],
  });

  // === Delete mutation ===
  const deleteMutation = useApiMutation<{}, void>({
    endpoint: () => ({
      path: `/course/${formData.id}`,
      method: 'DELETE',
    }),
    invalidateKeys: [['courses']],
  });

  // === Loading / Error States ===
  if (isAuthPending) return <p>Authenticating...</p>;
  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error loading courses: {(error as Error)?.message}</p>;

  // === Handle Submit ===
  const handleSubmit = async () => {
    try {
      if (showModal === 'create') {
        await createMutation.mutateAsync({
          title: formData.title,
          description: formData.description,
          instructorId: Number(formData.instructorId),
        });
      } else if (showModal === 'update') {
        await updateMutation.mutateAsync({
          title: formData.title,
          description: formData.description,
        });
      } else if (showModal === 'delete') {
        await deleteMutation.mutateAsync({});
      }

      // On success
      setShowModal(null);
      resetForm();
      router.navigate({ to: '/courses' }); // go back to courses page
    } catch (err) {
      console.error('Mutation failed:', err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* === Sidebar === */}
      <div className="sidebar">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/courses">Courses</Link>
        <Link className="nav-link" to="/calendar">Calendar</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/inbox">Inbox</Link>
        <LogOutButton />
      </div>

      {/* === Main Content === */}
      <div className="main-content">
        <div className="button-bar">
          <button className="modal-create" onClick={() => setShowModal('create')}>Create Course</button>
          <br />
          <button className="modal-update" onClick={() => setShowModal('update')}>Update Course</button>
          <br />
          <button className="modal-delete" onClick={() => setShowModal('delete')}>Delete Course</button>
          <br />
        </div>

        <h1 className="courses-title">All Courses</h1>

        {/* === Course List === */}
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="course-list">
            {courses.map((course) => (
              <div key={course.id} className="course-item">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <small>
                  Instructor ID: {course.instructorId} | Created: {new Date(course.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* === Modal === */}
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

              {/* === Inputs === */}
              {(showModal === 'create' || showModal === 'update') && (
                <>
                  {showModal === 'update' && (
                    <input
                      type="text"
                      placeholder="Course ID"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    />
                  )}
                  {showModal === 'create' && (
                    <input
                      type="text"
                      placeholder="Instructor ID"
                      value={formData.instructorId}
                      onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <textarea
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </>
              )}

              {showModal === 'delete' && (
                <input
                  type="text"
                  placeholder="Course ID"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              )}

              {/* === Buttons === */}
              <div className="modal-buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={() => setShowModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
