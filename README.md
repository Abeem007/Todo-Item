## Todo Item Card

A responsive, accessible Todo/Task Card built with HTML, CSS, and JavaScript.

This project now extends a basic todo card into a more stateful, dynamic component, focusing on testability, accessibility, and UI behavior .

### Features

* New Edit actions 
* Accessible (keyboard navigation, ARIA labels, semantic HTML)
* Added dynamic time remaining calculation.(now updates every 60sec)
* Added editable task (title, description, priority, due date)
* New feature to expand / collapse long descriptions
* Task completion toggle (now syncs with status)
* New Overdue detection with visual feedback
* Priority & status indicators
* Tags (work, urgent)
* Fully responsive (320px → 1200px)

### New Edit Mode
* Click Edit to enter edit mode
* Update:
- Title
- Description
- Priority
-  Due date
*  Save updates the card
* Cancel restores previous values

### New Status Logic
* Checkbox → sets status to Done
* Status control → updates checkbox automatically
* Unchecking after Done → reverts to Pending
* Status is always synced across:
- Checkbox
- Status display
- Status control

### Testability

All required elements include exact data-testid attributes for automated testing.

### Time Management

Displays dynamic time states such as:

* “Due in 2 days”
* “Due in 3 hours”
* “Overdue by 1 hour”

#### Additional behavior:

* Updates every 60 seconds
* Shows Overdue indicator when past due date
* When task is Done → displays "Completed" and stops updating

### Accessibility
* Semantic HTML (article, time, button, label)
* Keyboard navigable
* Focus-visible styles
* ARIA labels for screen readers

### Responsiveness
* Mobile: stacked layout, full-width buttons
* Desktop: centered card (max-width ~500px)

### Tech Stack
* HTML5
* CSS3 (Flexbox + Media Queries)
* Vanilla JavaScript

### Author
Built by Bimbola
