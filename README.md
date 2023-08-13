
# What Should I Cook?

![Project Logo](log.png) 

An AI-powered application that suggests recipes based on ingredients identified in an uploaded image.

## Features

1. **Ingredient Detection**: AI-driven detection of ingredients from images, powered by Roboflow in conjunction with YOLO.
2. **Personalized Recipe Suggestions**: Recommendations tailored to detected ingredients, dietary preferences, and intolerances.
3. **User-Friendly Interface**: Intuitive design and user experience developed with React.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Mobile App](#mobile-app)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Tech Stack

- **Frontend**: React, Ionic.
- **Backend**: Flask (Python) hosted on an AWS EC2 instance.
- **AI**: Custom Image Processor for ingredient detection, coupled with YOLO.
- **API**: Spoonacular API for fetching recipes.

## Mobile App

[Download the .apk: What Should I Cook? APK](app-debug.apk)

## Getting Started

### Prerequisites

Ensure you have Node.js and Ionic installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ilai-Av-Ron/what-should-i-cook.git
   ```

2. Navigate to the project directory:
   ```bash
   cd what-should-i-cook
   ```

3. Start the Ionic app:
   ```bash
   ionic serve
   ```

4. Open your browser and navigate to `http://localhost:8100` (or the port displayed in your terminal).

## Contributing

1. Fork the repository.
2. Create a new branch for your enhancements.
3. Implement your changes.
4. Submit a pull request detailing your modifications.

## License

MIT License.

## Acknowledgements

- Gratitude to my mentor for this project, David Kalmanson.
- A special thanks to Spoonacular API for offering comprehensive recipe data.

---
