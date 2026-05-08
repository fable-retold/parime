const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-TopBar",

	DefaultRenderable: "ParimeManagement-TopBar-Content",
	DefaultDestinationAddress: "#ParimeManagement-TopBar-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-topbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: var(--theme-color-text-primary, #3D3229);
			color: #F5F0E8;
			padding: 0 1.5em;
			height: 56px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
			position: sticky;
			top: 0;
			z-index: 100;
		}
		.parime-topbar-brand {
			font-size: 1.25em;
			font-weight: 600;
			letter-spacing: 0.02em;
			color: #2E7D74;
			text-decoration: none;
			cursor: pointer;
		}
		.parime-topbar-brand:hover {
			color: #3A9E93;
		}
		.parime-topbar-nav {
			display: flex;
			align-items: center;
			gap: 0.25em;
		}
		.parime-topbar-nav a {
			color: #B5AA9A;
			text-decoration: none;
			padding: 0.5em 0.75em;
			border-radius: 4px;
			font-size: 0.9em;
			transition: background-color 0.15s, color 0.15s;
			cursor: pointer;
		}
		.parime-topbar-nav a:hover {
			background-color: #524438;
			color: #F5F0E8;
		}
		.parime-topbar-nav a.active {
			background-color: #2E7D74;
			color: var(--theme-color-background-panel, #fff);
		}
		.parime-topbar-user {
			display: flex;
			align-items: center;
			gap: 0.75em;
			font-size: 0.9em;
		}
		.parime-topbar-user span {
			color: #8A7F72;
		}
		.parime-topbar-user a {
			color: #B5AA9A;
			text-decoration: none;
			cursor: pointer;
			padding: 0.4em 0.6em;
			border-radius: 4px;
			transition: background-color 0.15s, color 0.15s;
		}
		.parime-topbar-user a:hover {
			background-color: #524438;
			color: #F5F0E8;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-TopBar-Template",
			Template: /*html*/`
<div class="parime-topbar">
	<a class="parime-topbar-brand" onclick="{~P~}.PictApplication.navigateTo('/Dashboard')">Parime</a>
	<div class="parime-topbar-nav" id="ParimeManagement-TopBar-Nav"></div>
	<div class="parime-topbar-user" id="ParimeManagement-TopBar-UserArea"></div>
</div>
`
		},
		{
			Hash: "ParimeManagement-TopBar-LoggedIn-Template",
			Template: /*html*/`<span>{~D:AppData.ParimeManagement.User.DisplayName~}</span><a onclick="{~P~}.PictApplication.logout()">Logout</a>`
		},
		{
			Hash: "ParimeManagement-TopBar-LoggedOut-Template",
			Template: /*html*/`<a onclick="{~P~}.PictApplication.navigateTo('/Login')">Login</a>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-TopBar-Content",
			TemplateHash: "ParimeManagement-TopBar-Template",
			DestinationAddress: "#ParimeManagement-TopBar-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementTopBarView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		let tmpAppData = this.pict.AppData.ParimeManagement;
		let tmpCurrentRoute = (tmpAppData && tmpAppData.CurrentRoute) || '';

		// Build navigation links with active state
		let tmpNavLinks = [
			{ Route: '/Dashboard', Label: 'Dashboard', View: 'ParimeManagement-Dashboard' },
			{ Route: '/Lakes', Label: 'Lakes', View: 'ParimeManagement-Lakes' },
			{ Route: '/Configuration', Label: 'Configuration', View: 'ParimeManagement-Configuration' }
		];

		let tmpNavHTML = '';
		for (let i = 0; i < tmpNavLinks.length; i++)
		{
			let tmpLink = tmpNavLinks[i];
			let tmpActiveClass = (tmpCurrentRoute === tmpLink.View) ? ' class="active"' : '';
			tmpNavHTML += `<a${tmpActiveClass} onclick="${this.pict.getClientSideReferenceForPict()}.PictApplication.navigateTo('${tmpLink.Route}')">${tmpLink.Label}</a>`;
		}
		this.pict.ContentAssignment.assignContent('#ParimeManagement-TopBar-Nav', tmpNavHTML);

		// Conditionally render the user area based on login state
		let tmpUserData = tmpAppData && tmpAppData.User;
		let tmpTemplateHash = (tmpUserData && tmpUserData.LoggedIn) ? 'ParimeManagement-TopBar-LoggedIn-Template' : 'ParimeManagement-TopBar-LoggedOut-Template';

		let tmpUserAreaContent = this.pict.parseTemplateByHash(tmpTemplateHash, {}, null, this.pict);
		this.pict.ContentAssignment.assignContent('#ParimeManagement-TopBar-UserArea', tmpUserAreaContent);

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementTopBarView;

module.exports.default_configuration = _ViewConfiguration;
