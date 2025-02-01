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
      },
    };
  }

  componentDidMount() {
    let taxstring = localStorage.getItem("com.rvnd.lazytax:taxstate");
    if (taxstring != null) {
      let taxstate = JSON.parse(taxstring);
      this.setState({
        ...taxstate,
      });
    } else localStorage.removeItem("com.rvnd.lazytax:taxstate");
  }

  update(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
    localStorage.setItem(
      "com.rvnd.lazytax:taxstate",
      JSON.stringify({
        ...this.state,
        [field]: value,
      })
    );
  }

  formatIndian(number) {
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

  getGrossAnnualSalary() {
    //return <h5>Annual Gross Salary :<b>₹ {this.formatIndian(Number(this.state.basic) + Number(this.state.hra) + Number(this.state.other))}</b></h5>
    return (
      Number(this.state.basic) +
      Number(this.state.hra) +
      Number(this.state.other)
    );
  }

  getEmployeePF() {
    return Number((12.0 / 100.0) * this.state.basic);
  }

  calculateSlabTax(remaining, slab_range, tax_rate) {
    if (remaining > slab_range) return slab_range * (tax_rate / 100.0);
    else return remaining * (tax_rate / 100.0);
  }

  calculateNewSchemeTax() {
    let totaltaxable = this.getGrossAnnualSalary();

    //No tax upto 12L - Full rebate
    if (totaltaxable <= 1200000) totaltaxable = 0;

    //Standard Deduction of 75,000
    totaltaxable = totaltaxable - 75000.0;

    let slab1 = this.calculateSlabTax(totaltaxable, 400000, 0);
    let rem1 = totaltaxable - 400000;
    if (rem1 <= 0) rem1 = 0;

    let slab2 = this.calculateSlabTax(rem1, 400000, 5);
    let rem2 = rem1 - 400000;
    if (rem2 <= 0) rem2 = 0;

    let slab3 = this.calculateSlabTax(rem2, 400000, 10);
    let rem3 = rem2 - 400000;
    if (rem3 <= 0) rem3 = 0;

    let slab4 = this.calculateSlabTax(rem3, 400000, 15);
    let rem4 = rem3 - 400000;
    if (rem4 <= 0) rem4 = 0;

    let slab5 = this.calculateSlabTax(rem4, 400000, 20);
    let rem5 = rem4 - 400000;
    if (rem5 <= 0) rem5 = 0;

    let slab6 = this.calculateSlabTax(rem5, 400000, 25);
    let rem6 = rem5 - 400000;
    if (rem6 <= 0) rem6 = 0;

    let slab7 = this.calculateSlabTax(rem6, rem6, 30);

    let cess =
      (4.0 / 100.0) * (slab1 + slab2 + slab3 + slab4 + slab5 + slab6 + slab7);
    let final = {
      s1: Number(slab1),
      s2: Number(slab2),
      s3: Number(slab3),
      s4: Number(slab4),
      s5: Number(slab5),
      s6: Number(slab6),
      s7: Number(slab7),
      rem1: Number(rem1),
      rem2: Number(rem2),
      rem3: Number(rem3),
      rem4: Number(rem4),
      rem5: Number(rem5),
      rem6: Number(rem6),
      cess: Number(cess),
      totaltax: Number(
        slab1 + slab2 + slab3 + slab4 + slab5 + slab6 + slab7 + cess
      ),
    };

    let oldie = JSON.stringify(this.state.newscheme);
    let finaly = JSON.stringify(final);

    if (oldie !== finaly) {
      this.setState({
        ...this.state,
        newscheme: final,
      });
    }
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
        Total Deductions : <b>₹ {this.formatIndian(Number(75000))}</b>
      </h5>
    );

    this.calculateNewSchemeTax();
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
                  <Form.Control type="number" value="75000" disabled />
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
                <tr>
                  <td>0 to ₹4,00,000</td>
                  <td>0%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s1)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem1)}</td>
                </tr>
                <tr>
                  <td>₹4,00,000 to ₹8,00,000 </td>
                  <td>5%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s2)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem2)}</td>
                </tr>
                <tr>
                  <td>₹8,00,001 to ₹12,00,000</td>
                  <td>10%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s3)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem3)}</td>
                </tr>
                <tr>
                  <td>₹12,00,001 to ₹16,00,000</td>
                  <td>15%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s4)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem4)}</td>
                </tr>
                <tr>
                  <td>₹16,00,001 to ₹20,00,000</td>
                  <td>20%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s5)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem5)}</td>
                </tr>
                <tr>
                  <td>₹20,00,001 to ₹24,00,000</td>
                  <td>25%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s6)}</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.rem6)}</td>
                </tr>
                <tr>
                  <td>Above ₹24,00,000</td>
                  <td>30%</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.s7)}</td>
                </tr>
                <tr>
                  <td>Cess</td>
                  <td>4% on Tax</td>
                  <td>₹ {this.formatIndian(this.state.newscheme.cess)}</td>
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
