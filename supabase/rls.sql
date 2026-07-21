-- ============================================================
-- ROW LEVEL SECURITY POLICIES FOR CIVILSPAGE
-- Run this in Supabase SQL Editor after migrations
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_affairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM users WHERE auth_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER;

-- ────────────────────────────────────────────────────────────
-- USERS
-- ────────────────────────────────────────────────────────────
-- Users can read their own profile
CREATE POLICY "users_read_own" ON users
  FOR SELECT USING (auth_id = auth.uid());

-- Admins can read all users
CREATE POLICY "users_admin_read_all" ON users
  FOR SELECT USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- Users can insert their own profile (on signup)
CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth_id = auth.uid());

-- Super admin can do anything
CREATE POLICY "users_super_admin_all" ON users
  USING (get_user_role() = 'super_admin');

-- ────────────────────────────────────────────────────────────
-- BLOGS
-- ────────────────────────────────────────────────────────────
-- Public: read published blogs
CREATE POLICY "blogs_public_read" ON blogs
  FOR SELECT USING (published = true);

-- Admin: full access
CREATE POLICY "blogs_admin_all" ON blogs
  USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- CATEGORIES & TAGS
-- ────────────────────────────────────────────────────────────
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_write" ON categories USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

CREATE POLICY "tags_public_read" ON tags FOR SELECT USING (true);
CREATE POLICY "tags_admin_write" ON tags USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

CREATE POLICY "blog_tags_public_read" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "blog_tags_admin_write" ON blog_tags USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- CURRENT AFFAIRS
-- ────────────────────────────────────────────────────────────
CREATE POLICY "ca_public_read" ON current_affairs
  FOR SELECT USING (published = true);

CREATE POLICY "ca_admin_all" ON current_affairs
  USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- COURSES & LESSONS
-- ────────────────────────────────────────────────────────────
CREATE POLICY "courses_public_read" ON courses FOR SELECT USING (published = true);
CREATE POLICY "courses_admin_all" ON courses USING (get_user_role() IN ('super_admin', 'educator'));

CREATE POLICY "lessons_public_read" ON lessons FOR SELECT USING (published = true);
CREATE POLICY "lessons_admin_all" ON lessons USING (get_user_role() IN ('super_admin', 'educator'));

-- ────────────────────────────────────────────────────────────
-- NOTES
-- ────────────────────────────────────────────────────────────
CREATE POLICY "notes_public_read" ON notes FOR SELECT USING (true);
CREATE POLICY "notes_admin_all" ON notes USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- PYQs
-- ────────────────────────────────────────────────────────────
CREATE POLICY "pyqs_public_read" ON pyqs FOR SELECT USING (true);
CREATE POLICY "pyqs_admin_all" ON pyqs USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- QUIZZES
-- ────────────────────────────────────────────────────────────
CREATE POLICY "quizzes_public_read" ON quizzes FOR SELECT USING (active = true);
CREATE POLICY "quizzes_admin_all" ON quizzes USING (get_user_role() IN ('super_admin', 'educator'));

-- ────────────────────────────────────────────────────────────
-- STUDENTS, PAYMENTS, BOOKMARKS, COMMENTS
-- ────────────────────────────────────────────────────────────
CREATE POLICY "students_read_own" ON students USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "students_admin_read" ON students FOR SELECT USING (get_user_role() IN ('super_admin', 'educator'));

CREATE POLICY "payments_read_own" ON payments USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "payments_admin_read" ON payments FOR SELECT USING (get_user_role() = 'super_admin');

CREATE POLICY "bookmarks_user_all" ON bookmarks USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "comments_public_read" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "comments_user_write" ON comments FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY "comments_admin_all" ON comments USING (get_user_role() IN ('super_admin', 'educator', 'editor'));

-- ────────────────────────────────────────────────────────────
-- NEWSLETTER
-- ────────────────────────────────────────────────────────────
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_admin_read" ON newsletter_subscribers FOR SELECT USING (get_user_role() IN ('super_admin', 'educator'));
