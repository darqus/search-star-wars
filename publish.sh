#!/bin/bash
set -euo pipefail

# Get version and build date
VERSION=$(node -p "require('./package.json').version")
CDATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
COMMENT="Deploy v$VERSION ($CDATE)"

echo "Preparing deployment: $COMMENT"

# Build the app
vue-cli-service build

# Setup worktree for gh-pages
if [ ! -d gh-pages ]; then
  git worktree add gh-pages gh-pages
fi

# Deploy to gh-pages worktree
rsync -av --delete --exclude='.git' dist/ gh-pages/

# Commit and push
cd gh-pages
git add .
if git diff-index --quiet HEAD --; then
  echo "No changes to deploy"
else
  git commit -m "$COMMENT"
  git push https://github.com/darqus/search-star-wars-v2.git gh-pages
  echo "Successfully deployed to gh-pages"
fi

# Cleanup
cd ..
git worktree remove gh-pages
