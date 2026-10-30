# 04 - Data Model (MongoDB / Mongoose)

## users
| Field | Type | Rules |
|---|---|---|
| googleId | String | unique, **sparse** (many users without it) |
| email | String | required, unique, lowercase, trim |
| name | String | required, trim |
| password | String | optional (bcrypt hash; absent for Google users) |
| picture | String | default "" |
| lastLogin | Date | default now, updated on every login |
| createdAt / updatedAt | Date | `timestamps: true` |

## histories
| Field | Type | Rules |
|---|---|---|
| userId | ObjectId -> users | required, indexed |
| type | String | enum: translate, analyze, optimize, explain |
| inputCode | String | required |
| sourceLanguage | String | required |
| targetLanguage | String | default null (translate only) |
| output | Mixed | shape depends on `type` (see API spec) |
| createdAt / updatedAt | Date | timestamps |

Indexes: `users.email` unique, `users.googleId` unique sparse, `histories.userId`, `histories {userId:1, createdAt:-1}`.

## Why `Mixed` for output
Four operations return four shapes; one collection keeps queries and pagination simple. Shape is guaranteed by the service layer, not the DB.

## Retention
No automatic expiry in v1. Users can delete one or all entries. (Future: TTL index.)
