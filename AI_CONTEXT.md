# CYRA AI CONTEXT

## Project

CYRA = Cybernetic Youth Reality Agency

CYRA is a near-future cyberpunk AI artist agency and creative studio website.
It is not a simple portfolio, image gallery, VTuber site, generic idol homepage, or plain company site.

Core direction:

- Cyberpunk
- AI ARTIST
- Near-future Tokyo
- Neon pink / neon blue / subtle purple
- Black background
- Music, visuals, personality, and atmosphere are all part of the worldbuilding

## Important Rule

Always make focused changes only.

Do not redesign the whole site unless explicitly requested.

Before changing anything, preserve:

- existing layout
- existing design direction
- existing folder structure
- existing data-driven structure
- existing visual atmosphere

Use this rule often:

```text
変更箇所だけ反映してください。
既存レイアウト・デザイン・フォルダ構造は変更しないでください。
必要な参照パスのみ更新してください。
```

## Current Working Folder

The active GitHub-managed project folder is:

```text
C:\Users\skskp\OneDrive\ドキュメント\GitHub\cyra-official-site
```

Old working folder:

```text
C:\Users\skskp\OneDrive\ドキュメント\アイドル
```

The old folder may contain copies or previous working files.
Do not treat it as the main GitHub working directory.
Future edits should be done in the GitHub-managed project folder.

## Structure

Root files:

- index.html
- news.html
- news-detail.html
- sound.html
- styles.css
- script.js
- README.md
- AI_CONTEXT.md

Data files:

- data/talents.js
- data/news.js
- data/songs.js

Assets:

- assets/images/
- assets/video/
- assets/audio/

Important folder roles:

- assets/images/logo/ = logo and branding only
- assets/images/backgrounds/ = page backgrounds and decorative backgrounds
- assets/images/headquarters/ = CYRA office / HQ images
- assets/images/news/ = NEWS thumbnails only
- assets/images/talents/ = artist images
- assets/video/ = LIVE SCREEN / movie assets
- assets/audio/ = artist music files

Do not randomly move files between these folders.

## Naming Policy

Public-facing display:

- Use ARTIST / ARTISTS
- Use AI ARTIST
- Use CYRA ARTIST ID

Internal structure:

- Keep talent / talents
- Keep data/talents.js
- Keep CYRA_TALENTS
- Keep assets/images/talents/
- Keep sound.html?talent=reina
- Keep sound.html?talent=neo

Do not rename internal talent structure to artist.
Display can say ARTIST, but internal keys should remain talent.

## Talents / Artists

Current active artists:

### 001 夜永レイナ / Reina Yonaga

- Internal key: reina
- Direction: rainy Tokyo night, cyberpunk, future pop, emotional city atmosphere
- More drama opening / ending feeling
- Quiet, cinematic, late-night, urban mood

### 002 星環ネオ / Neo Hoshiwa

- Internal key: neo
- Direction: neon blue, city movement, energetic future pop
- More anime opening / energetic track feeling
- Faster, brighter, more active than Reina

Potential future artist:

- 003 rock-oriented artist
- Keep rock-heavy songs separate from Neo if they weaken Neo's identity

## Sound

SOUND page:

- sound.html

Music data:

- data/songs.js

Audio folders:

- assets/audio/reina/
- assets/audio/neo/

Audio file naming:

- lowercase English
- use hyphen between words
- avoid Japanese file names
- avoid spaces
- avoid symbols

Good:

- neon-drift.mp3
- rain-signal.mp3
- rush-hour.mp3
- signal-lost.mp3
- shien.mp3

Bad:

- Japanese file names
- Neon Drift.mp3

Song addition workflow:

1. Put the mp3 file into assets/audio/{talent}/
2. Add or update the song entry in data/songs.js
3. Set the audio path
4. Test sound.html?talent=reina or sound.html?talent=neo locally
5. Commit with GitHub Desktop
6. Push origin
7. Confirm GitHub Pages

Example song data:

```js
{
  talent: "reina",
  title: "Neon Drift",
  status: "demo",
  audio: "./assets/audio/reina/neon-drift.mp3",
}
```

If audio is missing:

- audio should be ""
- sound.html should show DEMO ONLY or COMING SOON

If a song no longer belongs to that artist:

- remove it from that artist's list
- do not leave it as DEMO ONLY unless it is intentionally listed as unreleased

SOUND behavior:

- Only one audio track should play at a time
- When another track starts, the previous track should stop and reset to 0
- Audio controls should show seek bar and duration
- Users should be able to jump within the track

## Profile To Sound Flow

Artist profile page has a VOICE SAMPLE / SOUND ARCHIVE area.

Expected flow:

```text
PROFILE
-> SOUND ARCHIVE
-> sound.html?talent={talent}
-> BACK TO PROFILE
-> corresponding artist profile
```

BACK TO PROFILE should return to the correct artist profile, not just browser history.

## Top Page

TOP page should focus on:

- CYRA world
- CYRA LIVE SCREEN
- agency atmosphere
- music / visual worldbuilding

Do not restore old TOP NEWS cards unless explicitly requested.

LIVE SCREEN:

- Keep video-based CYRA LIVE SCREEN
- Preserve autoplay / muted / loop / playsinline when editing the video tag
- Current direction: live footage, audience, penlights, purple lighting, movement

## News

NEWS data:

- data/news.js

NEWS pages:

- news.html
- news-detail.html

NEWS thumbnails:

- assets/images/news/

NEWS thumbnails should use a horizontal 16:9 style.

Do not mix NEWS thumbnails with page backgrounds.

## Safe Codex Workflow

When making changes:

1. Change one focused thing at a time
2. Avoid broad redesigns
3. Avoid renaming folders
4. Avoid changing internal data keys
5. Avoid touching unrelated files
6. Explain changed files after editing

Preferred prompt style:

```text
変更箇所だけ反映してください。
既存レイアウト・デザイン・フォルダ構造は変更しないでください。
必要な参照パスのみ更新してください。
```

## Deployment Workflow

Use GitHub Desktop.

Normal update flow:

1. Edit files in:

```text
C:\Users\skskp\OneDrive\ドキュメント\GitHub\cyra-official-site
```

2. Check local page
3. GitHub Desktop -> Changes
4. Summary example: Update CYRA sound page and content
5. Commit to main
6. Pull if GitHub Desktop requests it
7. Push origin
8. Check GitHub
9. Check GitHub Pages

Important:

Do not edit the old OneDrive\ドキュメント\アイドル folder as the main source anymore.

## Design Tone

CYRA should feel like:

- near-future Tokyo
- cyberpunk but not military
- neon but not messy
- premium but not corporate
- AI artist agency, not generic idol site
- music and visuals as worldbuilding

Avoid:

- generic idol homepage
- plain company site
- random image gallery feeling
- over-explaining
- breaking the atmosphere
