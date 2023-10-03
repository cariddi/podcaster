import { ColorModeScript, Heading } from '@chakra-ui/react';
import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import theme from './theme';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
	<StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<Suspense fallback={<Heading>Loading...</Heading>}>
			<RouterProvider router={createBrowserRouter(routes)} />
		</Suspense>
	</StrictMode>
);
