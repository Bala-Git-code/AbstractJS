### Node Abstraction :

All nodes are built using a shared BaseNode component that handles layout, styling, and handle generation. New nodes can be created declaratively by passing input/output configurations and custom content, reducing duplication and improving scalability.

## Styling

Node styling is centralized within a reusable `BaseNode` component to ensure a
clean, consistent, and unified appearance across all node types.

A subtle dark theme was implemented using Tailwind CSS, focusing on readability,
clear visual hierarchy, and minimal UI noise. Interactive elements such as inputs
and textareas inside nodes are styled using shared utility classes to maintain
consistency without introducing unnecessary global styling changes.

## Part 3: Text Node Logic

The Text node was enhanced to improve usability and better reflect real-world
pipeline behavior.

### Auto-Resizing Text Input
The text input dynamically adjusts its height as the user types, ensuring that
all content remains visible without requiring scrollbars. As the textarea grows,
the node itself expands automatically.

### Dynamic Variable Handles
The Text node supports variable definitions using double curly braces
(e.g., `{{input}}`). When such variables are detected:
- Each unique variable creates a corresponding input Handle on the left side
- Handles are added or removed dynamically as variables change
- Only valid JavaScript variable names are supported

This behavior allows the Text node to declare dependencies on upstream nodes,
similar to how variables work in the VectorShift platform.
