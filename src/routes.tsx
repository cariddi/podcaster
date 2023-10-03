import { createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './App';
import { Paths } from './paths';
import EpisodeDetails from './routes/EpisodeDetails';
import { ErrorPage } from './routes/Error';
import PodcastDetails from './routes/PodcastDetails';
import PodcastList from './routes/PodcastList';

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
