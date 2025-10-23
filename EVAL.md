# Evaluation Checklist — AI Studio Project

| Section        | Criteria                  | Description                                | Status |
| -------------- | ------------------------- | ------------------------------------------ | ------ |
| **Backend**    | Auth implemented          | Signup + Login with JWT                    | ✅     |
|                | Generations API           | POST + GET endpoints with image upload     | ✅     |
|                | Prisma used               | Database schema + CRUD tested              | ✅     |
|                | Error handling            | Proper HTTP codes                          | ✅     |
| **Frontend**   | Auth flow                 | Signup/Login UI works                      | ✅     |
|                | Studio page               | Prompt, style, upload, and history visible | ✅     |
|                | API integration           | Uses token + axios instance                | ✅     |
| **Infra**      | CI workflow               | `.github/workflows/ci.yml` added           | ✅     |
|                | OpenAPI Spec              | `OPENAPI.yaml` created                     | ✅     |
|                | EVAL file                 | `EVAL.md` created                          | ✅     |
|                | Git ignore                | node_modules, dist, uploads excluded       | ✅     |
| **Bonus**      | Image resizing with Sharp | Optional                                   | ⬜     |
|                | Toast notifications       | Optional UX improvement                    | ⬜     |
| **Submission** | Repo public + 2 PRs       | Ready to send                              | ✅     |
