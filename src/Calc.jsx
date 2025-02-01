import React from "react";
import Banner from "./Banner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: 0,
      hra: 0,
      other: 0,
      rent: 0,
      newscheme: {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
        s5: 0,
        s6: 0,
        s7: 0,
        rem1: 0,
        rem2: 0,
        rem3: 0,
        rem4: 0,
        rem5: 0,
        rem6: 0,
        cess: 0,
        totaltax: 0,
      },
    };

    this.TAX_SLABS = [
      { limit: 400000, rate: 0 },
      { limit: 400000, rate: 5 },
      { limit: 400000, rate: 10 },
      { limit: 400000, rate: 15 },
      { limit: 400000, rate: 20 },
      { limit: 400000, rate: 25 },
      { limit: Infinity, rate: 30 },
    ];

    this.STANDARD_DEDUCTION = 75000;
    this.CESS_RATE = 0.04;
  }

  componentDidMount() {
    let taxstring = localStorage.getItem("com.rvnd.lazytax:taxstate");
    if (taxstring != null) {
      let taxstate = JSON.parse(taxstring);
      this.setState(taxstate, () => {
        this.updateNewSchemeTax();
      });
    } else {
      localStorage.removeItem("com.rvnd.lazytax:taxstate");
    }
  }

  update = (field, value) => {
    this.setState(
      {
        [field]: value,
      },
      () => {
        this.updateNewSchemeTax();
        localStorage.setItem(
          "com.rvnd.lazytax:taxstate",
          JSON.stringify(this.state)
        );
      }
    );
  };

  getGrossAnnualSalary = () => {
    return (
      Number(this.state.basic) +
      Number(this.state.hra) +
      Number(this.state.other)
    );
  };

  getEmployeePF = () => {
    return Number((12.0 / 100.0) * this.state.basic);
  };

  calculateNewSchemeTax = (grossAnnualSalary) => {
    let taxableIncome = grossAnnualSalary;

    // No tax up to 12L - Full rebate
    if (taxableIncome <= 1200000) {
      return {
        totaltax: 0,
        slabs: this.TAX_SLABS.map(() => ({ taxAmount: 0, remainder: 0 })),
        cess: 0,
      };
    }

    // Apply standard deduction
    taxableIncome -= this.STANDARD_DEDUCTION;

    let remainingIncome = taxableIncome;
    let totalTax = 0;
    let slabs = [];

    for (let slab of this.TAX_SLABS) {
      let taxableAmount = Math.min(remainingIncome, slab.limit);
      let taxForSlab = (taxableAmount * slab.rate) / 100;

      totalTax += taxForSlab;
      remainingIncome -= taxableAmount;

      slabs.push({
        taxAmount: taxForSlab,
        remainder: remainingIncome,
      });

      if (remainingIncome <= 0) break;
    }

    let cess = totalTax * this.CESS_RATE;
    totalTax += cess;

    return {
      totaltax: totalTax,
      slabs: slabs,
      cess: cess,
    };
  };

  updateNewSchemeTax = () => {
    const result = this.calculateNewSchemeTax(this.getGrossAnnualSalary());

    const newScheme = {
      ...result.slabs.reduce(
        (acc, slab, index) => ({
          ...acc,
          [`s${index + 1}`]: slab.taxAmount,
          [`rem${index + 1}`]: slab.remainder,
        }),
        {}
      ),
      cess: result.cess,
      totaltax: result.totaltax,
    };

    this.setState({ newscheme: newScheme });
  };

  formatIndian(number) {
    if (!number) return 0;
    number = Number(number);
    number = number.toFixed(2);
    var n1, n2;
    let num = number + "" || "";
    // works for integer and floating as well
    n1 = num.split(".");
    n2 = n1[1] || null;
    n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    num = n2 ? n1 + "." + n2 : n1;
    return num;
  }

  render() {
    let gross_annual_salary = (
      <h5>
        <br />
        Annual Gross Salary :
        <b>₹ {this.formatIndian(Number(this.getGrossAnnualSalary()))}</b>
      </h5>
    );
    let new_totaltaxable = (
      <h5>
        <b>
          Total Taxable Income : ₹{" "}
          {this.formatIndian(Number(this.getGrossAnnualSalary()))}
        </b>
      </h5>
    );
    let new_total_deductions = (
      <h5>
        Total Deductions :{" "}
        <b>₹ {this.formatIndian(Number(this.STANDARD_DEDUCTION))}</b>
      </h5>
    );

    return (
      <div>
        <Banner></Banner>
        <Container fluid>
          <Row>
            <Col>
              <Form action="#">
                <Form.Group controlId="basicSalary">
                  <Form.Label>Basic Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Annual Basic Salary"
                    value={this.state.basic}
                    onChange={(e) => {
                      this.update("basic", e.target.value);
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                  <Form.Text className="text-muted">
                    Your annual basic salary
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="hra">
                  <Form.Label>Housing Allowance</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Annual HRA"
                    value={this.state.hra}
                    onChange={(e) => {
                      this.update("hra", e.target.value);
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                  <Form.Text className="text-muted">
                    Annual HRA your company provides
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="otherAllowance">
                  <Form.Label>Other Allowances/Bonuses</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Other allowances"
                    value={this.state.other}
                    onChange={(e) => {
                      this.update("other", e.target.value);
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                  <Form.Text className="text-muted">
                    Add up your other allowances/bonuses provided annually
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>{gross_annual_salary}</Col>
          </Row>
        </Container>
        <Container fluid>
          <br />
          <Row className="justify-content-md-center">
            <Col md={3}>
              <Form>
                <Form.Group controlId="stdded">
                  <Form.Label>Standard Deduction</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.STANDARD_DEDUCTION}
                    disabled
                  />
                  <Form.Text className="text-muted">
                    Standard deduction offered{" "}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <Col md={3}>
              <Form>
                <Form.Group controlId="pdfded">
                  <Form.Label>PF Deduction</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.getEmployeePF()}
                    disabled
                  />
                  <Form.Text className="text-muted">
                    PF @ 12% of Basic
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <br />
        </Container>

        <hr />
        <br />
        <br />
        <Container fluid>
          <h5 align="left">Tax Calculation (New Regime)</h5>
          {new_totaltaxable}
          {new_total_deductions}
          <br />
          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Slab</th>
                  <th>Tax Rate</th>
                  <th>Tax Payable</th>
                  <th>Remainder</th>
                </tr>
              </thead>
              <tbody>
                {this.TAX_SLABS.map((slab, index) => {
                  let lowerLimit =
                    index === 0
                      ? 0
                      : this.TAX_SLABS.slice(0, index).reduce(
                          (sum, s) => sum + s.limit,
                          0
                        );
                  let upperLimit =
                    index === this.TAX_SLABS.length - 1
                      ? "∞"
                      : lowerLimit + slab.limit;
                  return (
                    <tr key={index}>
                      <td>
                        {index === 0
                          ? `0 to ₹${this.formatIndian(upperLimit)}`
                          : index === this.TAX_SLABS.length - 1
                          ? `Above ₹${this.formatIndian(lowerLimit)}`
                          : `₹${this.formatIndian(
                              lowerLimit + 1
                            )} to ₹${this.formatIndian(upperLimit)}`}
                      </td>
                      <td>{slab.rate}%</td>
                      <td>
                        ₹{" "}
                        {this.formatIndian(
                          this.state.newscheme[`s${index + 1}`]
                        )}
                      </td>
                      <td>
                        ₹{" "}
                        {this.formatIndian(
                          this.state.newscheme[`rem${index + 1}`]
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>Cess</td>
                  <td>4% on Tax</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.cess)}</td>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan="3">TOTAL TAX TO BE PAID THIS YEAR</th>
                  <th>₹ {this.formatIndian(this.state.newscheme.totaltax)}</th>
                </tr>
                <tr>
                  <th colSpan="3">TOTAL TAX TO BE PAID PER MONTH</th>
                  <th>
                    ₹ {this.formatIndian(this.state.newscheme.totaltax / 12)}
                  </th>
                </tr>
                <tr>
                  <th colSpan="3">PF DEDUCTED PER MONTH</th>
                  <th>₹ {this.formatIndian(this.getEmployeePF() / 12)}</th>
                </tr>
                <tr>
                  <th colSpan="3">SALARY CREDITED EVERY MONTH</th>
                  <th>
                    ₹{" "}
                    {this.formatIndian(
                      (this.getGrossAnnualSalary() -
                        this.state.newscheme.totaltax -
                        this.getEmployeePF()) /
                        12
                    )}
                  </th>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default Calc;
