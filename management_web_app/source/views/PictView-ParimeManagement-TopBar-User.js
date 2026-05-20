const libPictView = require('pict-view');

/**
 * ParimeManagement-TopBar-User — slot view rendered into Theme-TopBar's
 * UserView slot (#Theme-TopBar-User). Shows either a Login link (when
 * logged out) or DisplayName + Logout (when logged in), plus the gear
 * button that reveals the Hidden settings overlay.
 *
 * Conditional render uses the one-or-zero-element-array TS trick:
 * onBeforeRender stamps LoggedInWrapper / LoggedOutWrapper arrays onto
 * AppData with the right length so each conditional template runs the
 * right number of times.
 */

const _ViewConfiguration =
{
	ViewIdentifier: 'ParimeManagement-TopBar-User',

	DefaultRenderable: 'ParimeManagement-TopBar-User-Display',
	DefaultDestinationAddress: '#Theme-TopBar-User',

	AutoRender: false,

	CSS: /*css*/`
		.parime-user
		{
			display: flex;
			align-items: center;
			height: 100%;
			gap: 8px;
			padding: 0 12px;
			color: var(--theme-color-text-on-brand, var(--theme-color-text-primary, #e0ebe8));
			font-size: 0.85rem;
		}
		.parime-user-display
		{
			color: var(--theme-color-text-on-brand, var(--theme-color-text-muted, #8a7f72));
			max-width: 140px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.parime-user-btn
		{
			height: 32px;
			padding: 0 12px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			line-height: 1;
			border-radius: 4px;
			cursor: pointer;
			font-size: 0.8rem;
			font-weight: 600;
			background: transparent;
			color: var(--theme-color-text-on-brand, var(--theme-color-text-secondary, #b5aa9a));
			border: 1px solid var(--theme-color-border-default, #524438);
			box-sizing: border-box;
			text-decoration: none;
		}
		.parime-user-btn:hover
		{
			color: var(--theme-color-text-on-brand, var(--theme-color-text-primary, #f5f0e8));
			border-color: var(--theme-color-brand-primary, #2E7D74);
			background: var(--theme-color-background-hover, rgba(255, 255, 255, 0.06));
		}
		.parime-user-btn-gear
		{
			padding: 0 8px;
		}
		.parime-user-btn-gear .pict-icon { font-size: 1.25em; }
	`,

	Templates:
	[
		{
			Hash: 'ParimeManagement-TopBar-User-LoggedIn',
			Template: /*html*/`<span class="parime-user-display" title="{~D:Record.DisplayName~}">{~D:Record.DisplayName~}</span><a class="parime-user-btn" onclick="{~P~}.PictApplication.logout()" title="Sign out" aria-label="Sign out">Logout</a>`
		},
		{
			Hash: 'ParimeManagement-TopBar-User-LoggedOut',
			Template: /*html*/`<a class="parime-user-btn" onclick="{~P~}.PictApplication.navigateTo('/Login')" title="Sign in" aria-label="Sign in">Login</a>`
		},
		{
			Hash: 'ParimeManagement-TopBar-User-Template',
			Template: /*html*/`
<div class="parime-user">
	{~TS:ParimeManagement-TopBar-User-LoggedIn:AppData.ParimeManagement.LoggedInWrapper~}{~TS:ParimeManagement-TopBar-User-LoggedOut:AppData.ParimeManagement.LoggedOutWrapper~}
	<button class="parime-user-btn parime-user-btn-gear" onclick="{~P~}.views['ParimeManagement-Layout'].toggleSettingsPanel()" title="Settings" aria-label="Settings">{~I:Settings~}</button>
</div>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'ParimeManagement-TopBar-User-Display',
			TemplateHash: 'ParimeManagement-TopBar-User-Template',
			DestinationAddress: '#Theme-TopBar-User',
			RenderMethod: 'replace'
		}
	]
};

class ParimeManagementTopBarUserView extends libPictView
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
			let tmpLoggedIn = !!(tmpAppData.User && tmpAppData.User.LoggedIn);
			tmpAppData.LoggedInWrapper  = tmpLoggedIn ? [ tmpAppData.User ] : [];
			tmpAppData.LoggedOutWrapper = tmpLoggedIn ? [] : [ {} ];
		}
		return super.onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();
		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementTopBarUserView;

module.exports.default_configuration = _ViewConfiguration;
