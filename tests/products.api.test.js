const request = require("supertest");
const app = require("../src/app");

// On mock le modèle Product pour éviter d'appeler la vraie DB
jest.mock("../src/models/product", () => ({
  find: jest.fn(),
}));

const Product = require("../src/models/product");

test("GET /api/products renvoie 200 et un tableau", async () => {
  Product.find.mockResolvedValue([
    { _id: "1", name: "Mock Burger", priceCents: 890, isAvailable: true },
  ]);

  const res = await request(app).get("/api/products");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body[0].name).toBe("Mock Burger");
});
