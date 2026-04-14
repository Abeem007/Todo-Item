## Todo Item Card

A responsive, accessible Todo/Task Card built with HTML, CSS, and JavaScript.

This project focuses on testability, accessibility, and clean UI design, following strict requirements for automated testing.

### Features
Fully responsive (320px → 1200px)
✅ Accessible (keyboard navigation, ARIA labels, semantic HTML)
✅ Dynamic time remaining calculation
✅ Task completion toggle (updates UI state)
✅ Priority & status indicators
✅ Tags (work, urgent)
✅ Edit & Delete actions (mock functionality)

### Testability

All required elements include exact data-testid attributes for automated testing

### Time Remaining Logic

The app calculates time remaining based on a fixed due date and displays user-friendly messages such as:

* “Due in 3 days”
* “Due tomorrow”
Updates automatically every 60 seconds.

### Accessibility
* Semantic HTML (article, time, button, label)
* Keyboard navigable
* Focus-visible styles
* ARIA labels for screen readers

### Responsiveness
Mobile: stacked layout, full-width buttons
Desktop: centered card (max-width ~500px)

### Tech Stack
HTML5
CSS3 (Flexbox + Media Queries)
Vanilla JavaScript

### Author
Built by Bimbola
