## Viewing Pages

The main entry point is main.tsx. To run and view a specific page, uncomment only one of the following lines:

```
import App from './App.tsx';  
import EMS from './Ems';
import Activity from './Activity';
```

And also, in the createRoot call, uncomment the corresponding component you want to render:
```
<Activity /> {/* Example: show Activity page */}
{/* <App /> */}
{/* <EMS /> */}
```

Only one component should be active at a time.


## Midterm Task Location
Midterm components are located in:
```
/Midterms/Task
```
You can navigate there to view the source code for the midterm implementation.
Technology used is Next.js


## Notes
- Always run npm install first before starting the app.
- For activities and prelim, run npm i on both backend and client
- Toggle between different phases (Prelim or Activities) by commenting/uncommenting the relevant lines in main.tsx.

