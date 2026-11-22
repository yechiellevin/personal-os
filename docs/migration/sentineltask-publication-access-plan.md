# SentinelTask publication and shared-access plan

## Current decision

SentinelTask will eventually be a shared household task application used by Yechiel and his wife through separate Google identities.

The intended production specification is:

> Require Google authentication. Yechiel is the owner and app administrator. His wife is an authorized app user. Both identities may create, read, update, and delete the shared Task records. Protected scheduling settings, timezone administration, application development, and owner-only operations remain restricted to Yechiel. The application must not expose Task data to unauthenticated or unapproved users. App MCP remains OAuth-only and exposes only `reconcile_activations`.

## Free-plan limitation discovered on 2026-11-22

Base44 rejected `workspace_with_login` with HTTP 402 and reported that Internal/Workspace visibility requires the Builder plan or higher. The Free plan therefore cannot presently implement either the preferred Private model or the proposed Workspace model.

Until a paid visibility model is available:

- keep the application unpublished;
- keep Google as the only enabled login method;
- keep Task RLS restricted to app administrators;
- do not import production POS data into a published application; and
- do not treat `public_with_login` as equivalent to an allowlist.

## Account and access transition note

### If Workspace visibility becomes available

1. Invite the wife's Google-account email address to the Base44 workspace as a Viewer.
2. She accepts the invitation and chooses **Continue with Google**, using that exact address.
3. Base44 creates or links her distinct user identity.
4. SentinelTask assigns her the app-level User role.
5. Task permissions allow her User role to view and edit the shared task collection.
6. Yechiel continues signing in through his own Google account.

### Later transition to Private visibility

1. Upgrade to a plan that supports Private visibility.
2. Invite or retain the same Google email as an authorized SentinelTask app user.
3. Confirm her identity appears under SentinelTask App Users.
4. Switch the application from Workspace to Private.
5. Remove her from general workspace membership if desired, leaving her with app-specific guest access.
6. Verify both identities still see and edit the same Task records.

Her Google identity and SentinelTask user record should remain the same; only the admission source changes from workspace membership to an app-specific invitation.

## Data-permission model

Visibility controls who may enter the application. Entity permissions independently control which data an admitted identity may access.

For the intended two-user shared dataset:

- do not use Creator Only or assignee-only Task permissions;
- do not use All Users;
- allow the two approved identities to work with the common Task collection;
- retain stronger restrictions on `PosSettings` and `TimezoneChange`;
- retain owner-only checks in scheduling and administrative backend functions; and
- test permissions with both accounts before publishing.

Until the wife's account exists and can be explicitly authorized, Task access remains admin-only.

## Pre-publication sequence

1. Select and enable a visibility model that admits only approved identities.
2. Disable remixing when the plan permits it.
3. Verify Google-only authentication.
4. Configure and test Task permissions for both approved identities.
5. Verify protected settings and owner-only functions remain restricted.
6. Announce a short write freeze for `tasks.json` and SentinelTask task records.
7. Save the frozen `tasks.json` snapshot and export SentinelTask.
8. Run and approve the normalized import dry run.
9. Import and validate the complete POS dataset.
10. Invite and test the second user.
11. Publish.
12. Connect POS through OAuth and run the external reconciliation test.
