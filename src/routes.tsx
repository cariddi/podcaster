import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './App';
import { Paths } from './paths';
import { ErrorPage } from './routes/Error';

const EpisodeDetails = lazy(() => import('./routes/EpisodeDetails'));
const PodcastDetails = lazy(() => import('./routes/PodcastDetails'));
const PodcastList = lazy(() => import('./routes/PodcastList'));

const base = Paths.HOME;
export const routes = createRoutesFromElements(
	<Route path={base} element={<App />}>
		<Route
			path={`${base}/`}
			element={<PodcastList />}
			errorElement={<ErrorPage />}
		/>
		<Route
			path={Paths.PODCAST}
			element={<PodcastDetails />}
			errorElement={<ErrorPage />}
		/>
		<Route
			path={Paths.EPISODE}
			element={<EpisodeDetails />}
			errorElement={<ErrorPage />}
		/>
	</Route>
);
