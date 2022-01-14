describe('Env', () => {
    it('DB_PASS should be set', () => {
        expect(process.env.DB_PASS).toBeDefined();
    });

    it('DB_USER should be set', () => {
        expect(process.env.DB_USER).toBeDefined();
    });

    it('ENV should be set', () => {
        expect(process.env.ENV).toBeDefined();
    });
});
