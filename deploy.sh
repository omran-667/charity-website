#!/bin/bash

# KHUTA PATHWAYS - PRODUCTION DEPLOYMENT SCRIPT
# This script prepares the repo for production push with the new Supabase backend

set -e

echo "🚀 KHUTA PATHWAYS - PRODUCTION DEPLOYMENT"
echo "========================================="
echo ""

# Verify build
echo "1️⃣  Building project..."
npm run build > /dev/null 2>&1 && echo "✅ Build successful" || { echo "❌ Build failed"; exit 1; }

# Create commit
echo "2️⃣  Preparing commit..."
git add -A

# Check for changes
if git diff --cached --quiet; then
  echo "⚠️  No changes to commit"
  exit 0
fi

# Commit with clear message
echo "3️⃣  Committing changes..."
git commit -m "feat: Add Supabase backend with dynamic admin dashboard

## What's New
- Integrated Supabase for all data management
- Created 3 database tables: news_posts, site_settings, contact_messages
- Built authentication-protected admin dashboard at /admin
- Implemented 3 admin modules:
  1. News Management (add, edit, delete posts)
  2. Site Configuration (edit all global metadata dynamically)
  3. Message Center (view and manage contact form submissions)

## Dynamic Features
- Contact page now loads all details from database
- Contact form submissions saved to Supabase
- All site text/settings editable without code changes
- Full CRUD operations for news posts

## Database Schema
- news_posts: id, title, content, image_url, created_at
- site_settings: id, key, value (for global metadata)
- contact_messages: id, name, phone, email, message, created_at, is_read

## Admin Access
- Login: /admin
- Credentials: Use Supabase Auth (create user in dashboard)

## Deployment
- Netlify auto-deploys from this commit
- Build: npm run build
- Publish: dist/

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>" || { echo "❌ Commit failed"; exit 1; }

echo "✅ Commit created"
echo ""

# Show git log
echo "4️⃣  Recent commits:"
git log --oneline -3
echo ""

# Ready to push
echo "5️⃣  READY TO PUSH!"
echo ""
echo "📋 Next Steps:"
echo "  1. Run: git push"
echo "  2. Netlify will auto-deploy"
echo "  3. Setup Supabase tables (see SUPABASE_SETUP.md)"
echo "  4. Create admin user in Supabase"
echo "  5. Test at /admin"
echo ""
echo "🎉 All set for production!"
