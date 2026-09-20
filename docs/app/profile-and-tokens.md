---
id: profile-and-tokens
title: Account Profile & API Access Tokens
sidebar_label: Profile & API Tokens
---

# Account Profile & API Access Tokens

Manage your user account settings, security credentials, and personal developer access tokens from the User Profile Modal.

---

## User Profile Management

Open your profile by clicking your avatar or username in the top right corner:
- **Edit Profile**: Update your displayed username or contact email address.
- **Change Password**: Provide your current password and set a new password.
- **Delete Account**: Permanently delete your user account and personal list entries (shared public catalog items remain in the database).

---

## Developer API Tokens

If you are building custom scripts, CLI integrations, or mobile apps that talk to MTVL, you can generate **Personal Access Tokens (PATs)**:

### 1. Generating a Token
1. Open **User Profile** > **API Tokens** tab.
2. Click **Create New Token**.
3. Enter a descriptive token name (e.g. `Home-Assistant-Script` or `CLI-Sync-Tool`).
4. Click **Generate**.
5. Copy the generated token string immediately. For security reasons, the full token string is only displayed once upon generation.

### 2. Revoking a Token
If a token is lost or compromised:
1. Locate the token in your active tokens list.
2. Click the **Revoke / Trash** icon.
3. The token is immediately invalidated across all active backend nodes.

```bash title="Using your API token with curl"
curl -X GET "https://api.mylists.cc/api/v1/movies/list" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```
