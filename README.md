# Mini Apps template

Template for creating new application on [VK Mini Apps](https://vk.com/vkappsdev) 
platform

Stack:
- Create React App
- VK Bridge
- VK UI (will be removed in near future)
- VK Icons
- React Redux (with devtools extension and `unionize`)
- Apollo Client (queries, mutations, subscriptions)
- Typescript
- JSS
- Customize CRA + React App Rewired
- Full theming support

The main purpose of this template is to provide best practices during
VK Mini Apps application developing. It is currently being reworked to avoid
using natural VK UI (means CSS or kind of it) and use JSS. There is a lot
tested in production code inside, so it is safe to start developing new 
application without problems.

All of the VKUI staff will be reworked in near future and currently, some
of components are already reimplemented in React Hooks and JSS.
