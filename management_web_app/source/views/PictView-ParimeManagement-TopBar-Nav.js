const libPictView = require('pict-view');

/**
 * ParimeManagement-TopBar-Nav — slot view rendered into Theme-TopBar's
 * NavView slot (#Theme-TopBar-Nav). parime has no sidebar, so the top
 * bar hosts the primary navigation: Dashboard / Lakes / Configuration.
 *
 * Re-rendered by renderTopBar() at the end of showView() whenever the
 * active view changes; onBeforeRender stamps an Active flag onto each
 * NavLink and pre-builds a ClassString so the template stays trivial.
 */

const _ViewConfiguration =
{
	ViewIdentifier: 'ParimeManagement-TopBar-Nav',

	DefaultRenderable: 'ParimeManagement-TopBar-Nav-Display',
	DefaultDestinationAddress: '#Theme-TopBar-Nav',

	AutoRender: false,

	CSS: /*css*/`
		.parime-nav
		{
			display: flex;
			align-items: center;
			height: 100%;
			gap: 4px;
			padding: 0 14px;
			color: var(--theme-color-text-on-brand, var(--theme-color-text-primary, #e0ebe8));
		}
		.parime-nav-link
		{
			display: inline-flex;
			align-items: center;
			height: 32px;
			padding: 0 12px;
			border-radius: 4px;
			cursor: pointer;
			font-size: 0.88rem;
			font-weight: 500;
			text-decoration: none;
			color: var(--theme-color-text-on-brand, var(--theme-color-text-secondary, #b5aa9a));
			transition: background-color 0.15s, color 0.15s;
		}
		.parime-nav-link:hover
		{
			background: var(--theme-color-background-hover, rgba(255, 255, 255, 0.08));
			color: var(--theme-color-text-on-brand, var(--theme-color-text-primary, #f5f0e8));
		}
		.parime-nav-link.active
		{
			background: var(--theme-color-background-selected, var(--theme-color-brand-primary, #2E7D74));
			color: var(--theme-color-text-on-brand, var(--theme-color-text-primary, #ffffff));
		}
	`,

	Templates:
	[
		{
			Hash: 'ParimeManagement-TopBar-Nav-Link',
			Template: /*html*/`<a class="{~D:Record.ClassString~}" onclick="{~P~}.PictApplication.navigateTo('{~D:Record.Route~}')" title="{~D:Record.Label~}">{~D:Record.Label~}</a>`
		},
		{
			Hash: 'ParimeManagement-TopBar-Nav-Template',
			Template: /*html*/`<div class="parime-nav">{~TS:ParimeManagement-TopBar-Nav-Link:AppData.ParimeManagement.NavLinks~}</div>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'ParimeManagement-TopBar-Nav-Display',
			TemplateHash: 'ParimeManagement-TopBar-Nav-Template',
			DestinationAddress: '#Theme-TopBar-Nav',
			RenderMethod: 'replace'
		}
	]
};

class ParimeManagementTopBarNavView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord)
	{
		let tmpAppData = this.pict.AppData.ParimeManagement;
		if (tmpAppData && Array.isArray(tmpAppData.NavLinks))
		{
			let tmpCurrent = tmpAppData.CurrentView || '';
			for (let i = 0; i < tmpAppData.NavLinks.length; i++)
			{
				let tmpLink = tmpAppData.NavLinks[i];
				tmpLink.Active = (tmpLink.View === tmpCurrent);
				tmpLink.ClassString = tmpLink.Active ? 'parime-nav-link active' : 'parime-nav-link';
			}
		}
		return super.onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();
		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementTopBarNavView;

module.exports.default_configuration = _ViewConfiguration;
