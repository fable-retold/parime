const libPictApplication = require('pict-application');
const libPictRouter = require('pict-router');

// Views
const libViewLayout = require('./views/PictView-ParimeManagement-Layout.js');
const libViewTopBar = require('./views/PictView-ParimeManagement-TopBar.js');
const libViewBottomBar = require('./views/PictView-ParimeManagement-BottomBar.js');
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

		// Add the layout view (the shell that contains top bar, workspace, bottom bar)
		this.pict.addView('ParimeManagement-Layout', libViewLayout.default_configuration, libViewLayout);

		// Add the top bar and bottom bar views
		this.pict.addView('ParimeManagement-TopBar', libViewTopBar.default_configuration, libViewTopBar);
		this.pict.addView('ParimeManagement-BottomBar', libViewBottomBar.default_configuration, libViewBottomBar);

		// Add the content views
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

		// Render the layout shell first, then the initial content
		this.pict.views['ParimeManagement-Layout'].render();

		return super.onAfterInitializeAsync(fCallback);
	}

	/**
	 * Navigate to a route using the pict-router.
	 *
	 * @param {string} pRoute - The route path to navigate to (e.g. '/Dashboard')
	 */
	navigateTo(pRoute)
	{
		this.pict.providers.PictRouter.navigate(pRoute);
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
			this.pict.views[pViewIdentifier].render();
			// Re-render top bar to update active nav state
			this.pict.views['ParimeManagement-TopBar'].render();
		}
		else
		{
			this.pict.log.warn(`View [${pViewIdentifier}] not found; falling back to dashboard.`);
			this.pict.views['ParimeManagement-Dashboard'].render();
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

			// Re-render the top bar to show logged-in state, then navigate to dashboard
			this.pict.views['ParimeManagement-TopBar'].render();
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

		// Re-render the top bar and navigate to login
		this.pict.views['ParimeManagement-TopBar'].render();
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
