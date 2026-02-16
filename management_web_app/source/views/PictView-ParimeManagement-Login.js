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
			min-height: calc(100vh - 56px - 48px);
			padding: 2em;
		}
		.parime-login-card {
			background: #fff;
			border: 1px solid #DDD6CA;
			border-radius: 8px;
			padding: 2.5em;
			width: 100%;
			max-width: 400px;
			box-shadow: 0 2px 8px rgba(61, 50, 41, 0.08);
		}
		.parime-login-card h2 {
			margin: 0 0 0.25em 0;
			font-size: 1.5em;
			font-weight: 600;
			color: #3D3229;
		}
		.parime-login-card p {
			margin: 0 0 1.5em 0;
			color: #7A7568;
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
			color: #5E5549;
		}
		.parime-login-field input {
			width: 100%;
			padding: 0.6em 0.75em;
			border: 1px solid #DDD6CA;
			border-radius: 4px;
			font-size: 0.95em;
			color: #423D37;
			background: #fff;
			transition: border-color 0.15s;
		}
		.parime-login-field input:focus {
			outline: none;
			border-color: #2E7D74;
			box-shadow: 0 0 0 2px #E0EDEB;
		}
		.parime-login-button {
			width: 100%;
			padding: 0.7em;
			background-color: #2E7D74;
			color: #fff;
			border: none;
			border-radius: 4px;
			font-size: 1em;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.15s;
			margin-top: 0.5em;
		}
		.parime-login-button:hover {
			background-color: #256861;
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
			<input type="password" id="parime-login-password" placeholder="Enter password" />
		</div>
		<button class="parime-login-button" id="parime-login-submit">Sign In</button>
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

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		// Wire up the login button click handler
		let tmpLoginButton = document.getElementById('parime-login-submit');
		if (tmpLoginButton)
		{
			tmpLoginButton.addEventListener('click', () =>
			{
				let tmpUserName = document.getElementById('parime-login-username').value;
				let tmpPassword = document.getElementById('parime-login-password').value;
				this.pict.PictApplication.attemptLogin(tmpUserName, tmpPassword);
			});
		}

		// Wire up Enter key on password field
		let tmpPasswordField = document.getElementById('parime-login-password');
		if (tmpPasswordField)
		{
			tmpPasswordField.addEventListener('keypress', (pEvent) =>
			{
				if (pEvent.key === 'Enter')
				{
					let tmpUserName = document.getElementById('parime-login-username').value;
					let tmpPassword = document.getElementById('parime-login-password').value;
					this.pict.PictApplication.attemptLogin(tmpUserName, tmpPassword);
				}
			});
		}

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementLoginView;

module.exports.default_configuration = _ViewConfiguration;
