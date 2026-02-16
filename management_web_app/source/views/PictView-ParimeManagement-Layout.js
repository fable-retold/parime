const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-Layout",

	DefaultRenderable: "ParimeManagement-Layout-Shell",
	DefaultDestinationAddress: "#ParimeManagement-Application-Container",

	AutoRender: false,

	CSS: /*css*/`
		#ParimeManagement-Application-Container {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
		}
		#ParimeManagement-TopBar-Container {
			flex-shrink: 0;
		}
		#ParimeManagement-Content-Container {
			flex: 1;
		}
		#ParimeManagement-BottomBar-Container {
			flex-shrink: 0;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-Layout-Shell-Template",
			Template: /*html*/`
<div id="ParimeManagement-TopBar-Container"></div>
<div id="ParimeManagement-Content-Container"></div>
<div id="ParimeManagement-BottomBar-Container"></div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-Layout-Shell",
			TemplateHash: "ParimeManagement-Layout-Shell-Template",
			DestinationAddress: "#ParimeManagement-Application-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementLayoutView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		// After the layout shell is rendered, render the child views into their containers
		this.pict.views['ParimeManagement-TopBar'].render();
		this.pict.views['ParimeManagement-BottomBar'].render();

		// Render initial content -- the dashboard by default
		this.pict.views['ParimeManagement-Dashboard'].render();

		// Inject all view CSS into the PICT-CSS style element
		this.pict.CSSMap.injectCSS();

		// Now resolve the router so it picks up the current hash URL
		if (this.pict.providers.PictRouter)
		{
			this.pict.providers.PictRouter.resolve();
		}

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementLayoutView;

module.exports.default_configuration = _ViewConfiguration;
