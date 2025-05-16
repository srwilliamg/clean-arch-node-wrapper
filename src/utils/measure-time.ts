export const measureTime = () => ({
  startDate: new Date(),
  endDate: new Date(),
  start() {
    this.startDate = new Date();
    return this;
  },
  end() {
    this.endDate = new Date();
    return this.endDate - this.startDate;
  },
});
