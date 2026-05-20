const libPictView = require('pict-view');

/**
 * ParimeManagement-SettingsPanel — content of the Hidden right-side
 * settings overlay managed by the shell. The panel itself is built in
 * Layout._buildShell() with Hidden:true; the gear button in
 * TopBar-User toggles its visibility. This view renders the interior.
 *
 * Theme / mode / scale are owned by pict-section-theme (its own
 * localStorage scope). The Appearance section hosts the mount point;
 * Theme-Section.mount() renders Picker / ModeToggle / ScaleSelect into
 * it on every render (the template rewrite erases the previously-mounted
 * views, so we re-mount each time).
 */

const _ViewConfiguration =
{
	ViewIdentifier: 'ParimeManagement-SettingsPanel',

	DefaultRenderable: 'ParimeManagement-SettingsPanel-Display',
	DefaultDestinationAddress: '#ParimeManagement-Settings-Panel',

	AutoRender: false,

	CSS: /*css*/`
		#ParimeManagement-Settings-Panel .parime-settings-body
		{
			padding: 16px;
			font-size: 0.85rem;
			color: var(--theme-color-text-primary, #3D3229);
		}
		.parime-settings-section { margin-bottom: 18px; }
		.parime-settings-label
		{
			font-size: 0.72rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.6px;
			color: var(--theme-color-text-muted, #8A7F72);
			margin-bottom: 8px;
		}
		#ParimeManagement-Settings-Theme .pict-theme-mount
		{
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		#ParimeManagement-Settings-Theme .pict-theme-mount-row
		{
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	`,

	Templates:
	[
		{
			Hash: 'ParimeManagement-SettingsPanel-Template',
			Template: /*html*/`
<div class="parime-settings-body">
	<div class="parime-settings-section">
		<div class="parime-settings-label">Appearance</div>
		<div id="ParimeManagement-Settings-Theme"></div>
	</div>
</div>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'ParimeManagement-SettingsPanel-Display',
			TemplateHash: 'ParimeManagement-SettingsPanel-Template',
			DestinationAddress: '#ParimeManagement-Settings-Panel',
			RenderMethod: 'replace'
		}
	]
};

class ParimeManagementSettingsPanelView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();

		let tmpThemeProvider = this.pict.providers && this.pict.providers['Theme-Section'];
		if (tmpThemeProvider && typeof tmpThemeProvider.mount === 'function')
		{
			tmpThemeProvider.mount(
			{
				Container: '#ParimeManagement-Settings-Theme',
				Views: ['Picker', 'ModeToggle', 'ScaleSelect']
			});
		}

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementSettingsPanelView;

module.exports.default_configuration = _ViewConfiguration;
