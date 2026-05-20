const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-Login",

	DefaultRenderable: "ParimeManagement-Login-Content",
	DefaultDestinationAddress: "#ParimeManagement-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-login {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100%;
			padding: 2em;
		}
		.parime-login-card {
			background: var(--bg-panel);
			border: 1px solid var(--border-default);
			border-radius: 8px;
			padding: 2.5em;
			width: 100%;
			max-width: 400px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		}
		.parime-login-card h2 {
			margin: 0 0 0.25em 0;
			font-size: 1.5em;
			font-weight: 600;
			color: var(--text-primary);
		}
		.parime-login-card p {
			margin: 0 0 1.5em 0;
			color: var(--text-muted);
			font-size: 0.9em;
		}
		.parime-login-field {
			margin-bottom: 1em;
		}
		.parime-login-field label {
			display: block;
			margin-bottom: 0.35em;
			font-size: 0.85em;
			font-weight: 500;
			color: var(--text-secondary);
		}
		.parime-login-field input {
			width: 100%;
			padding: 0.6em 0.75em;
			border: 1px solid var(--border-default);
			border-radius: 4px;
			font-size: 0.95em;
			color: var(--text-primary);
			background: var(--bg-panel);
			transition: border-color 0.15s;
		}
		.parime-login-field input:focus {
			outline: none;
			border-color: var(--accent);
			box-shadow: 0 0 0 2px var(--accent-bg);
		}
		.parime-login-button {
			width: 100%;
			padding: 0.7em;
			background-color: var(--accent);
			color: var(--bg-panel);
			border: none;
			border-radius: 4px;
			font-size: 1em;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.15s;
			margin-top: 0.5em;
		}
		.parime-login-button:hover {
			background-color: var(--accent-hover);
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-Login-Template",
			Template: /*html*/`
<div class="parime-login">
	<div class="parime-login-card">
		<h2>Parime Management</h2>
		<p>Sign in to manage your data lake.</p>
		<div class="parime-login-field">
			<label for="parime-login-username">Username</label>
			<input type="text" id="parime-login-username" placeholder="Enter username" />
		</div>
		<div class="parime-login-field">
			<label for="parime-login-password">Password</label>
			<input type="password" id="parime-login-password" placeholder="Enter password" onkeypress="if (event.key === 'Enter') { {~P~}.views['ParimeManagement-Login'].submit(); }" />
		</div>
		<button class="parime-login-button" id="parime-login-submit" onclick="{~P~}.views['ParimeManagement-Login'].submit()">Sign In</button>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-Login-Content",
			TemplateHash: "ParimeManagement-Login-Template",
			DestinationAddress: "#ParimeManagement-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementLoginView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	submit()
	{
		let tmpUserField = document.getElementById('parime-login-username');
		let tmpPassField = document.getElementById('parime-login-password');
		let tmpUserName = tmpUserField ? tmpUserField.value : '';
		let tmpPassword = tmpPassField ? tmpPassField.value : '';
		this.pict.PictApplication.attemptLogin(tmpUserName, tmpPassword);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.CSSMap.injectCSS();
		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementLoginView;

module.exports.default_configuration = _ViewConfiguration;
