const libPictView = require('pict-view');

/**
 * ParimeManagement-Layout — application chrome.
 *
 * Built on pict-section-modal's shell() API. Every chrome surface lives
 * in a panel; the content views render into the shell-managed center.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ #Theme-TopBar  (top, fixed, 56px) — BrandMark + Nav + User   │
 *   ├──────────────────────────────────────────────────────────────┤
 *   │ #ParimeManagement-Content-Container                          │
 *   │ (center — Dashboard / Lakes / Configuration / Login render   │
 *   │  into this destination; only the active view is visible)     │
 *   ├──────────────────────────────────────────────────────────────┤
 *   │ #Theme-BottomBar (bottom, fixed, 32px) — StatusBar slot      │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Plus #ParimeManagement-Settings-Panel — a Hidden overlay panel
 * revealed only by the gear button in the User slot.
 */

const _ViewConfiguration =
{
	ViewIdentifier: 'ParimeManagement-Layout',

	DefaultRenderable: 'ParimeManagement-Layout-Renderable',
	DefaultDestinationAddress: '#ParimeManagement-Application-Container',

	AutoRender: false,

	CSS: /*css*/`
		/* height: 100% (NOT 100vh) — Theme-Scale applies CSS zoom to
		   <html>; vh renders against the un-zoomed viewport and pushes
		   panels off-screen. */
		html, body { height: 100%; margin: 0; padding: 0; }
		#ParimeManagement-Application-Container { height: 100%; min-height: 0; overflow: hidden; }

		/* Shell-managed surfaces inherit themed colors. */
		.pict-modal-shell-host   { height: 100%; }
		.pict-modal-shell        { background: var(--theme-color-background-primary, #F5F0E8); }
		.pict-modal-shell-panel  { background: var(--theme-color-background-panel,   #FFFFFF); }
		.pict-modal-shell-center { background: var(--theme-color-background-primary, #F5F0E8); }

		/* Center workspace destination. Existing content views target
		   #ParimeManagement-Content-Container — we keep the ID so they
		   render unchanged into the shell center. */
		#ParimeManagement-Content-Container { height: 100%; min-height: 0; overflow: auto; }

		/* Settings (Hidden overlay) panel destination. */
		#ParimeManagement-Settings-Panel
		{
			height: 100%;
			min-height: 0;
			overflow-y: auto;
			background: var(--theme-color-background-panel, #FFFFFF);
			color: var(--theme-color-text-primary, #3D3229);
			border-left: 1px solid var(--theme-color-border-default, #DDD6CA);
		}
	`,

	Templates:
	[
		{
			Hash: 'ParimeManagement-Layout-Template',
			// Minimal mount div — the shell replaces its children with its
			// own row/side/center/overlay DOM.
			Template: /*html*/`<div id="ParimeManagement-Layout-Mount" style="height:100%"></div>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'ParimeManagement-Layout-Renderable',
			TemplateHash: 'ParimeManagement-Layout-Template',
			DestinationAddress: '#ParimeManagement-Application-Container',
			RenderMethod: 'replace'
		}
	]
};

class ParimeManagementLayoutView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this._shell = null;
		this._shellPanelsBuilt = false;
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();

		if (!this._shellPanelsBuilt)
		{
			this._buildShell();
			this._shellPanelsBuilt = true;

			// Now that the shell has created #ParimeManagement-Content-Container,
			// render the topbar slot views and seed the initial content view.
			// Dashboard renders first as a safe default; the router then
			// resolves the current hash (if any) and may navigate to a
			// different view, overwriting the dashboard.
			if (this.pict.PictApplication && typeof this.pict.PictApplication.showView === 'function')
			{
				this.pict.PictApplication.showView('ParimeManagement-Dashboard');
			}
			if (this.pict.providers.PictRouter)
			{
				this.pict.providers.PictRouter.resolve();
			}
		}

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}

	_buildShell()
	{
		let tmpModal = this.pict.views['Pict-Section-Modal'];
		if (!tmpModal || typeof tmpModal.shell !== 'function')
		{
			this.pict.log.warn('ParimeManagement-Layout: pict-section-modal.shell not available');
			return;
		}

		let tmpMount = document.getElementById('ParimeManagement-Layout-Mount');
		if (!tmpMount)
		{
			this.pict.log.warn('ParimeManagement-Layout: #ParimeManagement-Layout-Mount not in DOM yet');
			return;
		}

		this._shell = tmpModal.shell(tmpMount, { PersistenceKey: 'parime-management-shell' });

		// Top — Theme-TopBar (BrandMark + Nav slot + User slot). Size MUST
		// equal ViewOptions.TopBar.Height in the Theme-Section provider config.
		this._shell.addPanel(
		{
			Hash: 'topbar',
			Side: 'top',
			Mode: 'fixed',
			Size: 56,
			ContentDestinationId: 'Theme-TopBar',
			ContentView: 'Theme-TopBar'
		});

		// Bottom — Theme-BottomBar with our StatusView slot. Add before
		// the center so it anchors at the viewport's bottom edge.
		this._shell.addPanel(
		{
			Hash: 'statusbar',
			Side: 'bottom',
			Mode: 'fixed',
			Size: 32,
			MinSize: 20,
			ContentDestinationId: 'Theme-BottomBar',
			ContentView: 'Theme-BottomBar'
		});

		// Right (Hidden + Overlay) — settings panel. No edge affordance;
		// the gear button in the User slot is the only way in.
		this._shell.addPanel(
		{
			Hash: 'settings',
			Side: 'right',
			Mode: 'resizable',
			Position: 'overlay',
			Size: 380,
			MinSize: 300,
			MaxSize: 560,
			Hidden: true,
			Collapsed: true,
			ContentDestinationId: 'ParimeManagement-Settings-Panel',
			ContentView: 'ParimeManagement-SettingsPanel'
		});

		// Center — reuse the existing ID so Dashboard / Lakes / Configuration /
		// Login render unchanged into the shell center.
		this._shell.center({ ContentDestinationId: 'ParimeManagement-Content-Container' });
	}

	getSettingsPanel() { return this._shell ? this._shell.getPanel('settings') : null; }

	toggleSettingsPanel()
	{
		let tmpPanel = this.getSettingsPanel();
		if (tmpPanel) { tmpPanel.toggle(); }
	}
}

module.exports = ParimeManagementLayoutView;

module.exports.default_configuration = _ViewConfiguration;
