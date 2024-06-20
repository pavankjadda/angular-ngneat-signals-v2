import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideQueryClientOptions } from '@ngneat/query';
import { provideQueryDevTools } from '@ngneat/query-devtools';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideAnimations(),
		provideQueryClientOptions({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: false,
					refetchOnReconnect: true,
					staleTime: 600000,
				},
			},
		}),
		provideQueryDevTools({}),
	],
};
