# Qodo To-Do App

This is a simple to-do list web application generated using the Qodo Gen VS Code extension.

## Features
- Add new tasks
- Mark tasks as complete
- Delete tasks
- Responsive and clean UI
- Uses localStorage for data persistence

## Files
- `index.html`: Main HTML file
- `style.css`: Styling
- `app.js`: JavaScript logic

## Manual Testing and Bug Fixes

During manual testing, I identified and fixed the following issues:

1. **Duplicate Tasks Allowed**  
   - **Issue**: The app allowed users to add the same task multiple times.  
   - **Fix**: I implemented a check to prevent duplicate task entries.

2. **Tasks Lost After Page Refresh**  
   - **Issue**: All tasks were lost after refreshing the page due to lack of persistence.  
   - **Fix**: I added localStorage support to save and load the task list, ensuring tasks persist across sessions.
