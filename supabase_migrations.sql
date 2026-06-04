-- Create news_posts table
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('charity_name', 'جمعية خطى الأمان'),
('phone_number', '+966 12 345 6789'),
('location_address', 'الحي الإداري، شارع الجمعيات، مبنى ٢٤'),
('email', 'info@khuta.org'),
('working_hours', 'الأحد - الخميس: ٨ صباحًا - ٤ مساءً'),
('donation_link', 'https://donate.khuta.org'),
('about_us_text', 'جمعية خطى الأمان تعمل على تمكين الأفراد وبناء المجتمع من خلال برامج تنموية وتدريبية ومبادرات تطوعية تُحدث أثرًا حقيقيًا ومستدامًا.')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS for security
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read for settings, authenticated write for admin)
CREATE POLICY "Enable read access for all users" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON news_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for authenticated users" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for all users" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
