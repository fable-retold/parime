const libPictView = require('pict-view');

/**
 * ParimeManagement-StatusBar — slot view rendered into Theme-BottomBar's
 * StatusView slot (#Theme-BottomBar-Status). Shows the current route,
 * logged-in user, and server version separated by dots.
 *
 * Re-rendered by renderTopBar() on navigation, login/logout, and after
 * refreshServerInfo() updates AppData.ParimeManagement.ServerInfo.
 */

// Map raw view identifiers → human-readable labels for the status segment.
const _RouteLabels =
{
	'ParimeManagement-Dashboard':     'Dashboard',
	'ParimeManagement-Lakes':         'Lakes',
	'ParimeManagement-Configuration': 'Configuration',
	'ParimeManagement-Login':         'Sign in'
};

const _ViewConfiguration =
{
	ViewIdentifier: 'ParimeManagement-StatusBar',

	DefaultRenderable: 'ParimeManagement-StatusBar-Display',
	DefaultDestinationAddress: '#Theme-BottomBar-Status',

	AutoRender: false,

	CSS: /*css*/`
		.parime-status
		{
			display: inline-flex;
			align-items: center;
			gap: 6px;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 0.78rem;
			color: var(--theme-color-text-muted, #8A7F72);
		}
		.parime-status-separator
		{
			color: var(--theme-color-border-default, #DDD6CA);
		}
	`,

	Templates:
	[
		{
			Hash: 'ParimeManagement-StatusBar-Template',
			Template: /*html*/`<span class="parime-status"><span class="parime-status-route">{~D:AppData.ParimeManagement.StatusBar.RouteLabel~}</span><span class="parime-status-separator">·</span><span class="parime-status-user">{~D:AppData.ParimeManagement.StatusBar.UserLabel~}</span><span class="parime-status-separator">·</span><span class="parime-status-version">Parime v{~D:AppData.ParimeManagement.StatusBar.VersionLabel~}</span></span>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'ParimeManagement-StatusBar-Display',
			TemplateHash: 'ParimeManagement-StatusBar-Template',
			DestinationAddress: '#Theme-BottomBar-Status',
			RenderMethod: 'replace'
		}
	]
};

class ParimeManagementStatusBarView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord)
	{
		let tmpAppData = this.pict.AppData.ParimeManagement;
		if (tmpAppData)
		{
			let tmpView = tmpAppData.CurrentView || '';
			let tmpUser = (tmpAppData.User && tmpAppData.User.DisplayName) ? tmpAppData.User.DisplayName : 'anonymous';
			let tmpVersion = (tmpAppData.ServerInfo && tmpAppData.ServerInfo.Version) ? tmpAppData.ServerInfo.Version : '—';
			tmpAppData.StatusBar =
			{
				RouteLabel:   _RouteLabels[tmpView] || tmpView || 'Loading…',
				UserLabel:    tmpUser,
				VersionLabel: tmpVersion
			};
		}
		return super.onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();
		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementStatusBarView;

module.exports.default_configuration = _ViewConfiguration;
