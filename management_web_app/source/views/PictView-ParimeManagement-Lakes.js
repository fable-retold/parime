const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-Lakes",

	DefaultRenderable: "ParimeManagement-Lakes-Content",
	DefaultDestinationAddress: "#ParimeManagement-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-lakes {
			padding: 2em;
			max-width: 1200px;
			margin: 0 auto;
		}
		.parime-lakes-header {
			margin: 0 0 1.5em 0;
			padding-bottom: 1em;
			border-bottom: 1px solid #DDD6CA;
		}
		.parime-lakes-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 1.75em;
			font-weight: 400;
			color: var(--theme-color-text-primary, #3D3229);
		}
		.parime-lakes-header p {
			margin: 0;
			color: #7A7568;
			font-size: 1em;
		}
		.parime-lakes-tabs {
			display: flex;
			gap: 0;
			border-bottom: 2px solid #DDD6CA;
			margin-bottom: 1.5em;
		}
		.parime-lakes-tab {
			padding: 0.6em 1.25em;
			cursor: pointer;
			color: #7A7568;
			font-size: 0.95em;
			font-weight: 500;
			border-bottom: 2px solid transparent;
			margin-bottom: -2px;
			transition: color 0.15s, border-color 0.15s;
			background: none;
			border-top: none;
			border-left: none;
			border-right: none;
		}
		.parime-lakes-tab:hover {
			color: var(--theme-color-text-primary, #3D3229);
		}
		.parime-lakes-tab.active {
			color: #2E7D74;
			border-bottom-color: #2E7D74;
		}
		.parime-lakes-body {
			display: flex;
			gap: 1.5em;
			min-height: 400px;
		}
		.parime-lakes-sidebar {
			width: 260px;
			flex-shrink: 0;
		}
		.parime-lakes-main {
			flex: 1;
			min-width: 0;
		}
		.parime-lakes-list {
			background: var(--theme-color-background-panel, #fff);
			border: 1px solid #DDD6CA;
			border-radius: 6px;
			overflow: hidden;
		}
		.parime-lakes-list-header {
			padding: 0.75em 1em;
			background: var(--theme-color-background-secondary, #F0ECE4);
			color: var(--theme-color-text-secondary, #5E5549);
			font-size: 0.8em;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			border-bottom: 1px solid #DDD6CA;
		}
		.parime-lakes-list-item {
			padding: 0.6em 1em;
			cursor: pointer;
			border-bottom: 1px solid #EAE3D8;
			color: #423D37;
			font-size: 0.9em;
			transition: background-color 0.1s;
		}
		.parime-lakes-list-item:hover {
			background-color: #F7F5F0;
		}
		.parime-lakes-list-item.active {
			background-color: #E0EDEB;
			color: #2E7D74;
			font-weight: 500;
		}
		.parime-lakes-list-item:last-child {
			border-bottom: none;
		}
		.parime-lakes-list-empty {
			padding: 1.5em 1em;
			color: #8A7F72;
			font-size: 0.9em;
			text-align: center;
		}
		.parime-lakes-detail {
			background: var(--theme-color-background-panel, #fff);
			border: 1px solid #DDD6CA;
			border-radius: 6px;
			padding: 1.5em;
			min-height: 300px;
		}
		.parime-lakes-detail-header {
			font-size: 0.8em;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--theme-color-text-secondary, #5E5549);
			margin-bottom: 1em;
			padding-bottom: 0.5em;
			border-bottom: 1px solid #EAE3D8;
		}
		.parime-lakes-json {
			background: var(--theme-color-background-secondary, #F0ECE4);
			border: 1px solid #DDD6CA;
			border-radius: 4px;
			padding: 1em;
			font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
			font-size: 0.85em;
			color: #423D37;
			white-space: pre-wrap;
			word-break: break-word;
			overflow-x: auto;
			max-height: 500px;
			overflow-y: auto;
		}
		.parime-lakes-placeholder {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 300px;
			color: #8A7F72;
			font-size: 0.95em;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-Lakes-Template",
			Template: /*html*/`
<div class="parime-lakes">
	<div class="parime-lakes-header">
		<h1>Lakes</h1>
		<p>Browse and inspect record, binary and combined lake data.</p>
	</div>
	<div class="parime-lakes-tabs" id="ParimeManagement-Lakes-Tabs"></div>
	<div class="parime-lakes-body">
		<div class="parime-lakes-sidebar">
			<div class="parime-lakes-list" id="ParimeManagement-Lakes-CategoryList">
				<div class="parime-lakes-list-header">Categories</div>
				<div class="parime-lakes-list-empty">Loading...</div>
			</div>
			<div class="parime-lakes-list" id="ParimeManagement-Lakes-KeyList" style="margin-top: 1em; display: none;">
				<div class="parime-lakes-list-header">Keys</div>
			</div>
		</div>
		<div class="parime-lakes-main">
			<div class="parime-lakes-detail" id="ParimeManagement-Lakes-Detail">
				<div class="parime-lakes-placeholder">Select a category and key to view data.</div>
			</div>
		</div>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-Lakes-Content",
			TemplateHash: "ParimeManagement-Lakes-Template",
			DestinationAddress: "#ParimeManagement-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementLakesView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		let tmpPictRef = this.pict.getClientSideReferenceForPict();

		// Render tabs
		let tmpTabs = ['Record', 'Binary', 'Combined'];
		let tmpTabsHTML = '';
		for (let i = 0; i < tmpTabs.length; i++)
		{
			let tmpTab = tmpTabs[i];
			let tmpActiveClass = (tmpBrowser.ActiveTab === tmpTab) ? ' active' : '';
			tmpTabsHTML += `<button class="parime-lakes-tab${tmpActiveClass}" onclick="${tmpPictRef}.views['ParimeManagement-Lakes'].switchTab('${tmpTab}')">${tmpTab}</button>`;
		}
		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Tabs', tmpTabsHTML);

		// Fetch lake categories
		this.pict.PictApplication.refreshLakesSummary(() =>
		{
			this.renderCategoryList();
		});

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}

	switchTab(pTab)
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		tmpBrowser.ActiveTab = pTab;
		tmpBrowser.SelectedCategory = '';
		tmpBrowser.SelectedKey = '';
		tmpBrowser.CategoryKeys = [];
		tmpBrowser.KeyData = null;
		this.render();
	}

	renderCategoryList()
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		let tmpLakes = this.pict.AppData.ParimeManagement.Lakes;
		let tmpCategories = tmpLakes[tmpBrowser.ActiveTab] || [];
		let tmpPictRef = this.pict.getClientSideReferenceForPict();

		let tmpHTML = '<div class="parime-lakes-list-header">Categories</div>';

		if (tmpCategories.length === 0)
		{
			tmpHTML += '<div class="parime-lakes-list-empty">No categories found.</div>';
		}
		else
		{
			for (let i = 0; i < tmpCategories.length; i++)
			{
				let tmpCategory = tmpCategories[i];
				let tmpActiveClass = (tmpBrowser.SelectedCategory === tmpCategory) ? ' active' : '';
				tmpHTML += `<div class="parime-lakes-list-item${tmpActiveClass}" onclick="${tmpPictRef}.views['ParimeManagement-Lakes'].selectCategory('${tmpCategory}')">${tmpCategory}</div>`;
			}
		}

		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-CategoryList', tmpHTML);

		// Hide key list and detail when no category selected
		let tmpKeyListEl = document.getElementById('ParimeManagement-Lakes-KeyList');
		if (tmpKeyListEl)
		{
			tmpKeyListEl.style.display = tmpBrowser.SelectedCategory ? 'block' : 'none';
		}
	}

	selectCategory(pCategory)
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		tmpBrowser.SelectedCategory = pCategory;
		tmpBrowser.SelectedKey = '';
		tmpBrowser.KeyData = null;

		// Update the category list to show active state
		this.renderCategoryList();

		// Show loading in key list
		let tmpKeyListEl = document.getElementById('ParimeManagement-Lakes-KeyList');
		if (tmpKeyListEl)
		{
			tmpKeyListEl.style.display = 'block';
		}
		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-KeyList',
			'<div class="parime-lakes-list-header">Keys</div><div class="parime-lakes-list-empty">Loading...</div>');

		// Clear detail
		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail',
			'<div class="parime-lakes-placeholder">Select a key to view data.</div>');

		// Fetch keys for this category
		this.pict.PictApplication.fetchCategoryKeys(tmpBrowser.ActiveTab, pCategory,
			(pKeys) =>
			{
				tmpBrowser.CategoryKeys = pKeys;
				this.renderKeyList();
			});
	}

	renderKeyList()
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		let tmpKeys = tmpBrowser.CategoryKeys || [];
		let tmpPictRef = this.pict.getClientSideReferenceForPict();

		let tmpHTML = '<div class="parime-lakes-list-header">Keys</div>';

		if (tmpKeys.length === 0)
		{
			tmpHTML += '<div class="parime-lakes-list-empty">No keys found.</div>';
		}
		else
		{
			for (let i = 0; i < tmpKeys.length; i++)
			{
				let tmpKey = tmpKeys[i];
				// Combined lake keys are objects with a Key property
				let tmpKeyDisplay = (typeof(tmpKey) === 'object' && tmpKey.Key) ? tmpKey.Key : tmpKey;
				let tmpActiveClass = (tmpBrowser.SelectedKey === tmpKeyDisplay) ? ' active' : '';
				let tmpEscapedKey = tmpKeyDisplay.replace(/'/g, "\\'");
				tmpHTML += `<div class="parime-lakes-list-item${tmpActiveClass}" onclick="${tmpPictRef}.views['ParimeManagement-Lakes'].selectKey('${tmpEscapedKey}')">${tmpKeyDisplay}</div>`;
			}
		}

		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-KeyList', tmpHTML);
	}

	selectKey(pKey)
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		tmpBrowser.SelectedKey = pKey;

		this.renderKeyList();

		// Show loading in detail
		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail',
			'<div class="parime-lakes-detail-header">Loading...</div>');

		if (tmpBrowser.ActiveTab === 'Record')
		{
			this.pict.PictApplication.fetchRecord(tmpBrowser.SelectedCategory, pKey,
				(pData) =>
				{
					tmpBrowser.KeyData = pData;
					this.renderDetail();
				});
		}
		else if (tmpBrowser.ActiveTab === 'Binary')
		{
			// For binary, fetch stat info
			let tmpXHR = new XMLHttpRequest();
			tmpXHR.open('GET', `/1.0/Binary/${tmpBrowser.SelectedCategory}/${pKey}/Stat`, true);
			tmpXHR.onreadystatechange = () =>
			{
				if (tmpXHR.readyState === 4)
				{
					if (tmpXHR.status === 200)
					{
						try
						{
							tmpBrowser.KeyData = JSON.parse(tmpXHR.responseText);
						}
						catch (pError)
						{
							tmpBrowser.KeyData = { Error: 'Failed to parse response.' };
						}
					}
					else
					{
						tmpBrowser.KeyData = { Error: `HTTP ${tmpXHR.status}` };
					}
					this.renderDetail();
				}
			};
			tmpXHR.send();
		}
		else if (tmpBrowser.ActiveTab === 'Combined')
		{
			// For combined, fetch the record sub-endpoint
			this.pict.PictApplication.fetchRecord(tmpBrowser.SelectedCategory, `${pKey}`,
				(pData) =>
				{
					tmpBrowser.KeyData = pData;
					this.renderDetail();
				});
		}
	}

	renderDetail()
	{
		let tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
		let tmpData = tmpBrowser.KeyData;

		let tmpHTML = '';
		tmpHTML += `<div class="parime-lakes-detail-header">${tmpBrowser.ActiveTab} / ${tmpBrowser.SelectedCategory} / ${tmpBrowser.SelectedKey}</div>`;

		if (tmpData)
		{
			tmpHTML += `<div class="parime-lakes-json">${JSON.stringify(tmpData, null, 2)}</div>`;
		}
		else
		{
			tmpHTML += '<p style="color: #8A7F72;">No data available.</p>';
		}

		this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail', tmpHTML);
	}
}

module.exports = ParimeManagementLakesView;

module.exports.default_configuration = _ViewConfiguration;
