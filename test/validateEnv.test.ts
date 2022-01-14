describe("Env", () => {
  it("DB_PASS should be set", () => {
    expect(process.env.DB_PASS).toBeDefined();
  });
});
