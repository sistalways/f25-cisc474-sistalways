import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '../../../../packages/api/src/index';
import { useRouter } from '@tanstack/react-router';
import { useApiQuery, useApiMutation, useCurrentUser } from '../integrations/api';

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { data: user,error:isAuthPending } = useCurrentUser();

  // modal state
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [formData, setFormData] = useState({ id: '', title: '', description: '', instructorId: '' });

  const resetForm = () =>
    setFormData({ id: '', title: '', description: '', instructorId: '' });

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

  // === QUERY: Get all courses ===
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useApiQuery<CourseOut[]>(['courses'], '/course');

  // === MUTATIONS ===
  const createMutation = useApiMutation<CourseCreateIn, CourseOut>({
    path: '/course',
    method: 'POST',
    invalidateKeys: [['courses']],
  });

  const updateMutation = useApiMutation<CourseUpdateIn, CourseOut>({
    endpoint: (variables) => ({
      path: `/course/${formData.id}`,
      method: 'PUT',
    }),
    invalidateKeys: [['courses']],
  });

  const deleteMutation = useApiMutation<{}, void>({
    endpoint: () => ({
      path: `/course/${formData.id}`,
      method: 'DELETE',
    }),
    invalidateKeys: [['courses']],
  });

  // === Handle submit ===
  function handleSubmit() {
    if (showModal === 'create') {
      const payload: CourseCreateIn = {
        title: formData.title,
        description: formData.description,
        instructorId: Number(formData.instructorId || user?.id || 0),
      };
      createMutation.mutate(payload, {
        onSuccess: () => {
          resetForm();
          setShowModal(null);
          router.navigate({ to: '/courses' });
        },
      });
    } else if (showModal === 'update') {
      const payload: CourseUpdateIn = {
        title: formData.title,
        description: formData.description,
      };
      updateMutation.mutate(payload, {
        onSuccess: () => {
          resetForm();
          setShowModal(null);
          router.navigate({ to: '/courses' });
        },
      });
    } else if (showModal === 'delete') {
      deleteMutation.mutate({}, {
        onSuccess: () => {
          resetForm();
          setShowModal(null);
          router.navigate({ to: '/courses' });
        },
      });
    }
  }

  // === Loading / Error UI ===
  if (isAuthPending) return <p>Checking authentication..</p>;
  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error loading courses: {(error as Error)?.message}</p>;

  return (
    <div className="dashboard-container">
      {/* === Sidebar === */}
      <div className="sidebar">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" to="/courses">
          Courses
        </Link>
        <Link className="nav-link" to="/calendar">
          Calendar
        </Link>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
        <Link className="nav-link" to="/inbox">
          Inbox
        </Link>
        <Link className="logout" to="/">
          Log out
        </Link>
      </div>

      {/* === Main content === */}
      <div className="main-content">
        <div className="button-bar">
          <button className="modal-create" onClick={() => setShowModal('create')}>
            Create Course
          </button>
          <br />
          <button className="modal-update" onClick={() => setShowModal('update')}>
            Update Course
          </button>
          <br />
          <button className="modal-delete" onClick={() => setShowModal('delete')}>
            Delete Course
          </button>
          <br />
        </div>

        <h1 className="courses-title">All Courses</h1>

        {/* === Course list === */}
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
                <br />
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

              {/* === Form inputs === */}
              {(showModal === 'create' || showModal === 'update') && (
                <>
                  {showModal === 'update' && (
                    <>
                      <input
                        type="text"
                        placeholder="Course ID"
                        value={formData.id}
                        onChange={(e) =>
                          setFormData({ ...formData, id: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instructorId: e.target.value,
                          })
                        }
                      />
                      <br />
                    </>
                  )}
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  <br />
                  <textarea
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                  />
                  <br />
                </>
              )}

              
              {/* === Buttons === */} 
              <div className="modal-buttons"> 
              {showModal === 'create' && <button onClick={() => handleSubmit()}>Submit</button>} 
              {showModal === 'update' && <button onClick={() => handleSubmit()}>Submit</button>} 
              {showModal === 'delete' && <button onClick={() => handleSubmit()}>Submit</button>} 
              <button onClick={() => setShowModal(null)}>Cancel</button> </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
