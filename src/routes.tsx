import { createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './App';
import { Paths } from './paths';
import { ErrorPage } from './routes/Error';
import PodcastList from './routes/PodcastList';

const base = Paths.HOME;
export const routes = createRoutesFromElements(
	<Route path={base} element={<App />}>
		<Route
			path={`${base}/`}
			element={<PodcastList />}
			errorElement={<ErrorPage />}
		/>
	</Route>
);
