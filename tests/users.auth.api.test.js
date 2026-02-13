const request = require("supertest");

// Helper pour recharger app avec des mocks différents
const loadAppWithMocks = async (mockRole) => {
  jest.resetModules();

  // Mock authMiddleware.verifyToken pour simuler un user connecté
  jest.doMock("../src/middlewares/authMiddleware", () => ({
    verifyToken: (req, res, next) => {
      req.user = { userId: "mockId", role: mockRole };
      next();
    },
  }));

  // Mock roleMiddleware.allowRoles en gardant la logique réelle
  jest.doMock("../src/middlewares/roleMiddleware", () => ({
    allowRoles: (...allowed) => (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "Non authentifié" });
      if (!allowed.includes(req.user.role)) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      next();
    },
  }));

  // Mock User model (pas de DB)
  jest.doMock("../src/models/user", () => ({
    find: jest.fn().mockResolvedValue([
      { _id: "1", username: "admin1", role: "ADMIN" },
    ]),
  }));

  const app = require("../src/app");
  return app;
};

test("GET /api/users sans token renvoie 401", async () => {
  // Ici on charge l'app SANS mock verifyToken -> elle utilisera le vrai middleware et renverra 401
  jest.resetModules();
  const app = require("../src/app");

  const res = await request(app).get("/api/users");
  expect(res.statusCode).toBe(401);
});

test("GET /api/users avec rôle ACCUEIL renvoie 403", async () => {
  const app = await loadAppWithMocks("ACCUEIL");
  const res = await request(app).get("/api/users");

  expect(res.statusCode).toBe(403);
});

test("GET /api/users avec rôle ADMIN renvoie 200", async () => {
  const app = await loadAppWithMocks("ADMIN");
  const res = await request(app).get("/api/users");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body[0].role).toBe("ADMIN");
});
