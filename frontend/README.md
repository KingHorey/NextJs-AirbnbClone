# Next.js Airbnb Clone - Frontend

This is the frontend section of the Next.js Airbnb Clone project. The frontend is built using Next.js, React, and TypeScript. It includes various components and pages to provide a seamless user experience for browsing and booking properties.

## Project Structure

The project structure is organized as follows:

```
frontend/
├── app/
│   ├── ui/
│   │   ├── properties/
│   │   │   ├── properties.tsx
│   │   │   └── ...
│   ├── utilities/
│   │   ├── handleTokenRefresh.ts
│   │   └── ...
│   ├── config/
│   │   ├── env.ts
│   │   └── ...
│   ├── services/
│   │   ├── favorites.ts
│   │   └── ...
│   └── ...
├── public/
│   ├── svg/
│   │   ├── wifi.svg
│   │   ├── tvMinimal.svg
│   │   ├── washingMachine.svg
│   │   ├── dryer.svg
│   │   └── ...
│   └── ...
├── styles/
│   ├── globals.css
│   └── ...
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── rooms/
│   │   ├── [id].tsx
│   │   └── ...
│   └── ...
├── .env.local
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Key Directories and Files

- **app/**: Contains the main application logic, including UI components, utilities, configuration, and services.
  - **ui/**: Contains UI components used throughout the application.
    - **properties/**: Contains components related to property listings, such as `properties.tsx`.
  - **utilities/**: Contains utility functions, such as `handleTokenRefresh.ts`.
  - **config/**: Contains configuration files, such as `env.ts`.
  - **services/**: Contains service files for handling API requests, such as `favorites.ts`.
- **public/**: Contains static assets, such as SVG icons.
  - **svg/**: Contains SVG icons used in the application.
- **styles/**: Contains global CSS styles.
  - **globals.css**: Global CSS file for styling the application.
- **pages/**: Contains Next.js pages.
  - **\_app.tsx**: Custom App component for initializing pages.
  - **index.tsx**: Home page of the application.
  - **rooms/**: Contains pages related to individual room listings, such as `[id].tsx`.
- **.env.local**: Environment variables for the project.
- **next.config.js**: Next.js configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation.

## Getting Started

To get started with the frontend section of the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/NextJs-AirbnbClone.git
   cd NextJs-AirbnbClone/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to** `http://localhost:3000` to see the application in action.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more information.
