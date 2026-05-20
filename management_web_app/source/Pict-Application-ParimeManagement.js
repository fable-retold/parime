const libPictApplication = require('pict-application');
const libPictRouter = require('pict-router');

const libPictSectionModal = require('pict-section-modal');
const libPictSectionTheme = require('pict-section-theme');

const libParimeManagementBrand = require('./ParimeManagement-Brand.js');

// Views
const libViewLayout = require('./views/PictView-ParimeManagement-Layout.js');
const libViewTopBarNav = require('./views/PictView-ParimeManagement-TopBar-Nav.js');
const libViewTopBarUser = require('./views/PictView-ParimeManagement-TopBar-User.js');
const libViewStatusBar = require('./views/PictView-ParimeManagement-StatusBar.js');
const libViewSettingsPanel = require('./views/PictView-ParimeManagement-SettingsPanel.js');
const libViewLogin = require('./views/PictView-ParimeManagement-Login.js');
const libViewDashboard = require('./views/PictView-ParimeManagement-Dashboard.js');
const libViewLakes = require('./views/PictView-ParimeManagement-Lakes.js');
const libViewConfiguration = require('./views/PictView-ParimeManagement-Configuration.js');

class ParimeManagementApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		// Add the router provider with routes
		this.pict.addProvider('PictRouter', require('./providers/PictRouter-ParimeManagement-Configuration.json'), libPictRouter);

		// Modal system (confirm dialogs, shell panels)
		this.pict.addView('Pict-Section-Modal', libPictSectionModal.default_configuration, libPictSectionModal);

		// Layout shell
		this.pict.addView('ParimeManagement-Layout', libViewLayout.default_configuration, libViewLayout);

		// Theme system slot views — registered BEFORE the Theme-Section provider so its bootstrap can resolve them
		this.pict.addView('ParimeManagement-TopBar-Nav', libViewTopBarNav.default_configuration, libViewTopBarNav);
		this.pict.addView('ParimeManagement-TopBar-User', libViewTopBarUser.default_configuration, libViewTopBarUser);
		this.pict.addView('ParimeManagement-StatusBar', libViewStatusBar.default_configuration, libViewStatusBar);
		this.pict.addView('ParimeManagement-SettingsPanel', libViewSettingsPanel.default_configuration, libViewSettingsPanel);

		// Unified theme stack — Theme-Section provider drives the BrandMark + TopBar + BottomBar chrome,
		// and exposes Picker/ModeToggle/ScaleSelect controls for the settings overlay.
		this.pict.addProvider('Theme-Section',
			{
				ApplyDefault: 'retold-default',
				DefaultMode:  'system',
				DefaultScale: 1.0,
				Brand:        libParimeManagementBrand,
				Views: ['Picker', 'ModeToggle', 'ScaleSelect', 'BrandMark', 'TopBar', 'BottomBar'],
				ViewOptions:
				{
					TopBar:    { NavView: 'ParimeManagement-TopBar-Nav', UserView: 'ParimeManagement-TopBar-User', Height: 56 },
					BottomBar: { StatusView: 'ParimeManagement-StatusBar', Height: 32 }
				}
			}, libPictSectionTheme);

		// Content views
		this.pict.addView('ParimeManagement-Login', libViewLogin.default_configuration, libViewLogin);
		this.pict.addView('ParimeManagement-Dashboard', libViewDashboard.default_configuration, libViewDashboard);
		this.pict.addView('ParimeManagement-Lakes', libViewLakes.default_configuration, libViewLakes);
		this.pict.addView('ParimeManagement-Configuration', libViewConfiguration.default_configuration, libViewConfiguration);
	}

	onAfterInitializeAsync(fCallback)
	{
		// Initialize application state
		this.pict.AppData.ParimeManagement =
		{
			User:
			{
				LoggedIn: false,
				UserName: '',
				DisplayName: ''
			},
			CurrentRoute: 'Dashboard',
			CurrentView: 'ParimeManagement-Dashboard',
			NavLinks:
			[
				{ Route: '/Dashboard',     Label: 'Dashboard',     View: 'ParimeManagement-Dashboard',     Active: true  },
				{ Route: '/Lakes',         Label: 'Lakes',         View: 'ParimeManagement-Lakes',         Active: false },
				{ Route: '/Configuration', Label: 'Configuration', View: 'ParimeManagement-Configuration', Active: false }
			],
			ServerInfo:
			{
				Product: '',
				Version: '',
				Port: 0,
				Uptime: '',
				StartTime: ''
			},
			Lakes:
			{
				Record: [],
				Binary: [],
				Combined: []
			},
			Configuration: {},
			LakeBrowser:
			{
				ActiveTab: 'Record',
				SelectedCategory: '',
				SelectedKey: '',
				CategoryKeys: [],
				KeyData: null
			}
		};

		// Render the layout shell first; the shell's onAfterRender builds the chrome panels,
		// renders the topbar/statusbar slot views, then resolves the router to load the initial view.
		this.pict.views['ParimeManagement-Layout'].render();

		return super.onAfterInitializeAsync(fCallback);
	}

	/**
	 * Re-render the topbar nav, topbar user area, and status bar after a state change.
	 */
	renderTopBar()
	{
		let tmpNav = this.pict.views['ParimeManagement-TopBar-Nav'];
		let tmpUser = this.pict.views['ParimeManagement-TopBar-User'];
		let tmpStatus = this.pict.views['ParimeManagement-StatusBar'];
		if (tmpNav) { tmpNav.render(); }
		if (tmpUser) { tmpUser.render(); }
		if (tmpStatus) { tmpStatus.render(); }
	}

	/**
	 * Navigate to a route. Updates the browser URL hash via PictRouter
	 * (for back/forward semantics + deep-link sharing) and fires showView
	 * directly so the chrome + content update synchronously regardless of
	 * router template-eval timing.
	 *
	 * @param {string} pRoute - The route path to navigate to (e.g. '/Dashboard')
	 */
	navigateTo(pRoute)
	{
		if (this.pict.providers.PictRouter)
		{
			this.pict.providers.PictRouter.navigate(pRoute);
		}
		let tmpView = this._routeToView(pRoute);
		if (tmpView)
		{
			this.showView(tmpView);
		}
	}

	_routeToView(pRoute)
	{
		const tmpMap =
		{
			'/Dashboard':     'ParimeManagement-Dashboard',
			'/Lakes':         'ParimeManagement-Lakes',
			'/Configuration': 'ParimeManagement-Configuration',
			'/Login':         'ParimeManagement-Login'
		};
		return tmpMap[pRoute] || null;
	}

	/**
	 * Render a specific content view into the main workspace area.
	 * This is called by the router when a route is matched.
	 *
	 * @param {string} pViewIdentifier - The view identifier to render
	 */
	showView(pViewIdentifier)
	{
		if (pViewIdentifier in this.pict.views)
		{
			this.pict.AppData.ParimeManagement.CurrentRoute = pViewIdentifier;
			this.pict.AppData.ParimeManagement.CurrentView = pViewIdentifier;
			this.pict.views[pViewIdentifier].render();
			this.renderTopBar();
		}
		else
		{
			this.pict.log.warn(`View [${pViewIdentifier}] not found; falling back to dashboard.`);
			this.pict.AppData.ParimeManagement.CurrentRoute = 'ParimeManagement-Dashboard';
			this.pict.AppData.ParimeManagement.CurrentView = 'ParimeManagement-Dashboard';
			this.pict.views['ParimeManagement-Dashboard'].render();
			this.renderTopBar();
		}
	}

	/**
	 * Handle user login attempt.
	 *
	 * @param {string} pUserName - The username
	 * @param {string} pPassword - The password
	 */
	attemptLogin(pUserName, pPassword)
	{
		this.pict.log.info(`Login attempt for user [${pUserName}]`);

		// Accept any non-empty credentials for now
		if (pUserName && pPassword)
		{
			this.pict.AppData.ParimeManagement.User.LoggedIn = true;
			this.pict.AppData.ParimeManagement.User.UserName = pUserName;
			this.pict.AppData.ParimeManagement.User.DisplayName = pUserName;

			this.renderTopBar();
			this.navigateTo('/Dashboard');
		}
		else
		{
			this.pict.log.warn('Login failed: username and password are required.');
		}
	}

	/**
	 * Handle user logout.
	 */
	logout()
	{
		this.pict.AppData.ParimeManagement.User.LoggedIn = false;
		this.pict.AppData.ParimeManagement.User.UserName = '';
		this.pict.AppData.ParimeManagement.User.DisplayName = '';

		this.renderTopBar();
		this.navigateTo('/Login');
	}

	/**
	 * Fetch server info from the API and update AppData.
	 *
	 * @param {function} fCallback - Optional callback when data is loaded.
	 */
	refreshServerInfo(fCallback)
	{
		let tmpXHR = new XMLHttpRequest();
		tmpXHR.open('GET', '/1.0/ServerInfo', true);
		tmpXHR.onreadystatechange = () =>
		{
			if (tmpXHR.readyState === 4)
			{
				if (tmpXHR.status === 200)
				{
					try
					{
						let tmpData = JSON.parse(tmpXHR.responseText);
						this.pict.AppData.ParimeManagement.ServerInfo = tmpData;
						// Keep the status bar's server-version segment fresh
						let tmpStatus = this.pict.views['ParimeManagement-StatusBar'];
						if (tmpStatus) { tmpStatus.render(); }
					}
					catch (pError)
					{
						this.pict.log.warn('Failed to parse server info response.');
					}
				}
				if (typeof(fCallback) === 'function')
				{
					fCallback();
				}
			}
		};
		tmpXHR.send();
	}

	/**
	 * Fetch lake summary from the API and update AppData.
	 *
	 * @param {function} fCallback - Optional callback when data is loaded.
	 */
	refreshLakesSummary(fCallback)
	{
		let tmpXHR = new XMLHttpRequest();
		tmpXHR.open('GET', '/1.0/ServerInfo/Lakes', true);
		tmpXHR.onreadystatechange = () =>
		{
			if (tmpXHR.readyState === 4)
			{
				if (tmpXHR.status === 200)
				{
					try
					{
						let tmpData = JSON.parse(tmpXHR.responseText);
						if (tmpData.Lakes)
						{
							this.pict.AppData.ParimeManagement.Lakes = tmpData.Lakes;
						}
					}
					catch (pError)
					{
						this.pict.log.warn('Failed to parse lakes summary response.');
					}
				}
				if (typeof(fCallback) === 'function')
				{
					fCallback();
				}
			}
		};
		tmpXHR.send();
	}

	/**
	 * Fetch configuration from the API and update AppData.
	 *
	 * @param {function} fCallback - Optional callback when data is loaded.
	 */
	refreshConfiguration(fCallback)
	{
		let tmpXHR = new XMLHttpRequest();
		tmpXHR.open('GET', '/1.0/ServerInfo', true);
		tmpXHR.onreadystatechange = () =>
		{
			if (tmpXHR.readyState === 4)
			{
				if (tmpXHR.status === 200)
				{
					try
					{
						let tmpData = JSON.parse(tmpXHR.responseText);
						this.pict.AppData.ParimeManagement.Configuration = tmpData;
					}
					catch (pError)
					{
						this.pict.log.warn('Failed to parse configuration response.');
					}
				}
				if (typeof(fCallback) === 'function')
				{
					fCallback();
				}
			}
		};
		tmpXHR.send();
	}

	/**
	 * Fetch keys for a specific lake category.
	 *
	 * @param {string} pLakeType - 'Record', 'Binary', or 'Combined'
	 * @param {string} pCategory - The category name
	 * @param {function} fCallback - Callback(pKeys)
	 */
	fetchCategoryKeys(pLakeType, pCategory, fCallback)
	{
		let tmpXHR = new XMLHttpRequest();
		tmpXHR.open('GET', `/1.0/${pLakeType}/${pCategory}`, true);
		tmpXHR.onreadystatechange = () =>
		{
			if (tmpXHR.readyState === 4)
			{
				if (tmpXHR.status === 200)
				{
					try
					{
						let tmpData = JSON.parse(tmpXHR.responseText);
						fCallback(tmpData.Keys || []);
					}
					catch (pError)
					{
						fCallback([]);
					}
				}
				else
				{
					fCallback([]);
				}
			}
		};
		tmpXHR.send();
	}

	/**
	 * Fetch a specific record from the API.
	 *
	 * @param {string} pCategory - The category name
	 * @param {string} pKey - The record key
	 * @param {function} fCallback - Callback(pData)
	 */
	fetchRecord(pCategory, pKey, fCallback)
	{
		let tmpXHR = new XMLHttpRequest();
		tmpXHR.open('GET', `/1.0/Record/${pCategory}/${pKey}`, true);
		tmpXHR.onreadystatechange = () =>
		{
			if (tmpXHR.readyState === 4)
			{
				if (tmpXHR.status === 200)
				{
					try
					{
						fCallback(JSON.parse(tmpXHR.responseText));
					}
					catch (pError)
					{
						fCallback(null);
					}
				}
				else
				{
					fCallback(null);
				}
			}
		};
		tmpXHR.send();
	}
}

module.exports = ParimeManagementApplication;

module.exports.default_configuration = require('./Pict-Application-ParimeManagement-Configuration.json');
