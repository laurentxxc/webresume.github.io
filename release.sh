#!/usr/bin/env bash
set -euo pipefail

# release.sh - helper to create a release tag, CHANGELOG and archive
# Usage: ./release.sh <version>
# Example: ./release.sh v1.0.0

VERSION=${1:-}
DRY_RUN=0

if [ "${VERSION:-}" = "" ]; then
  echo "No version supplied. Usage: $0 vX.Y.Z"
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required"
  exit 1
fi

echo "Preparing release ${VERSION} on branch $(git rev-parse --abbrev-ref HEAD)"

# ensure working tree is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit or stash changes first."
  git status --porcelain
  exit 1
fi

# fetch tags
git fetch --tags

# generate CHANGELOG.md for this release if not present or to update it
LAST_TAG="$(git describe --tags --abbrev=0 2>/dev/null || true)"
echo "Generating CHANGELOG.md (last tag: ${LAST_TAG:-none})"

if [ -z "${LAST_TAG}" ]; then
  RANGE="";
else
  RANGE="${LAST_TAG}..HEAD"
fi

CHANGELOG=CHANGELOG.md
TMPCHANGELOG=$(mktemp /tmp/changelog.XXXXXX)

echo "# Changelog" > "$TMPCHANGELOG"
echo >> "$TMPCHANGELOG"
echo "## ${VERSION} - $(date +%F)" >> "$TMPCHANGELOG"
echo >> "$TMPCHANGELOG"

if [ -z "$RANGE" ]; then
  git log --pretty=format:"- %s (%h)" | sed 's/^/- /' >> "$TMPCHANGELOG" || true
else
  git log --pretty=format:"- %s (%h)" "$RANGE" >> "$TMPCHANGELOG" || true
fi

echo >> "$TMPCHANGELOG"
if [ -f "$CHANGELOG" ]; then
  # prepend new content
  { cat "$TMPCHANGELOG"; echo; cat "$CHANGELOG"; } > "${CHANGELOG}.new"
  mv "${CHANGELOG}.new" "$CHANGELOG"
else
  mv "$TMPCHANGELOG" "$CHANGELOG"
fi

rm -f "$TMPCHANGELOG" || true

git add "$CHANGELOG"
git commit -m "docs(changelog): prepare ${VERSION}" || echo "No changelog changes to commit"

# create annotated tag
echo "Creating annotated tag ${VERSION}"
git tag -a "$VERSION" -m "Release ${VERSION}"

# push commit and tag
echo "Pushing branch and tag to origin"
git push origin HEAD
git push origin "$VERSION"

# create zip archive (prefer packaging the `www/` static site if present)
ARCHIVE="webresume-${VERSION}.zip"
if [ -d "www" ]; then
  echo "Detected 'www/' directory — packaging site contents only"
  # If www/ is tracked in git we can use git archive to export only that subtree
  if git ls-tree -r --name-only HEAD | grep -q '^www/'; then
    git archive --format=zip --output="$ARCHIVE" HEAD:www
  else
    # Fallback to filesystem zip (requires `zip` installed)
    if command -v zip >/dev/null 2>&1; then
      (cd www && zip -r "../$ARCHIVE" .)
    else
      echo "zip command not found; falling back to archiving full repo"
      git archive --format=zip --output="$ARCHIVE" HEAD
    fi
  fi
else
  echo "No www/ directory found — packaging full repository"
  git archive --format=zip --output="$ARCHIVE" HEAD
fi
echo "Created archive: $ARCHIVE"

# attempt to create GitHub release if gh CLI available
if command -v gh >/dev/null 2>&1; then
  echo "Creating GitHub release via gh CLI"
  gh release create "$VERSION" "$ARCHIVE" --title "$VERSION" --notes-file "$CHANGELOG" || echo "gh release failed or already exists"
else
  echo "gh CLI not found; skipping GitHub release creation. You can run: gh release create $VERSION $ARCHIVE --title \"$VERSION\" --notes-file $CHANGELOG"
fi

echo "Release ${VERSION} prepared successfully."
