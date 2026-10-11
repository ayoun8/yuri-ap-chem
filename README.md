# AP Chemistry Study Hub

A static study website for AP Chemistry: unit notes, tutoring-session recaps, practice tests, and a formula sheet. It is plain HTML, CSS, and JavaScript, so there is no build step. Open `index.html` in a browser or publish with GitHub Pages.

## Site map

| Page | File |
|---|---|
| Home | `index.html` |
| Summer Review | `summer-review.html` |
| Units 0–5 notes | `units/unit-0.html` … `units/unit-5.html` |
| Test 1: What to Know | `tests/test-1.html` |
| Unit 0 Test: Review | `tests/unit-0-review.html` |
| Unit 0 Practice Tests 1 & 2 | `tests/unit-0-practice-1.html`, `tests/unit-0-practice-2.html` |
| Lesson recaps | `lessons/YYYY-MM-DD-topic.html` |
| Formula & Constants Sheet | `formula-sheet.html` |

`october-10-gases.html` and `unit0-test.html` are redirects, so old links still work. Old links like `index.html#unit3` also forward to the right page.

## How it's organized

```
assets/
  css/site.css      sidebar layout, colors, and base styles (every page)
  css/notes.css     course-notes pages
  css/practice.css  Unit 0 test review + practice tests
  css/lesson.css    lesson recaps
  css/home.css      homepage
  js/site.js        sidebar, search, progress, expand/collapse (every page)
  js/quiz.js        Mixed Mastery Quiz (Unit 0 page)
  js/practice.js    practice-test answer keys + grading
  js/lessons/       scripts for individual lesson pages
```

The sidebar is built from the `NAV` list at the top of `assets/js/site.js`, so it only needs to be edited in one place. Each page's **On this page** links come from elements that have a `data-toc="Label"` attribute.

## Adding a new lesson recap

1. Copy `lessons/2026-10-10-imfs-gases.html` to a new file, such as `lessons/2026-10-17-thermo.html`.
2. Change `<title>`, the `data-page` value on `<body>` (for example `lesson-2026-10-17`), and the content inside `<div class="wrap">`. Remove the `lessons/2026-10-10.js` script tag near the bottom, or point it to a script for the new lesson.
3. Give each section an `id` and a `data-toc` label so it appears in the sidebar.
4. In `assets/js/site.js`, add a line at the top of the **Lesson Recaps** group and move the `badge: 'Latest'` to it:
   ```js
   { key: 'lesson-2026-10-17', href: 'lessons/2026-10-17-thermo.html', label: 'Oct 17 · Thermochemistry', badge: 'Latest' },
   ```
5. On `index.html`, update the **Latest lesson** card and add a tile under **Lesson Recaps**.

## Notes

- Mastery checkboxes and progress are saved in each visitor's browser (localStorage), per page.
- The search box filters the current page.
- The homepage marks Unit 3 as the current unit. Update that tile in `index.html` when the class moves on.
