import React, { Component } from 'react';
import { connect } from 'react-redux'
import productActions from '../../actions/product/product'
import {setActiveProduct} from '../../actions/product/productPage'
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell, TextCellFormat} from '../../components/table/TableCells'
import {vendors} from './ProductForm';

class ProductsTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('productTable componentDidMount');
        const {dispatch} = this.props;
        dispatch(productActions.fetch());
    }

    eventDeleteProduct = (product) => {
        const {dispatch} = this.props;
        dispatch(productActions.delete(product));
    };

    eventEditProduct = (product) => {
        const {dispatch} = this.props;
        dispatch(setActiveProduct(product));
    };

    render() {
        const {products} = this.props;

        return (
            <div className="container-fluid">

                {products.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {products.length > 0 &&
                <Table
                    rowsCount={products.length}
                    rowHeight={50}
                    headerHeight={50}
                    width={900}
                    height={500}>
                    <Column
                        header={<Cell>Name</Cell>}
                        cell={<TextCell data={products} field="name" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Exp</Cell>}
                        cell={<TextCell data={products} field="expiration_date" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Eff</Cell>}
                        cell={<TextCell data={products} field="effective_date" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Vendor</Cell>}
                        cell={
                        <TextCellFormat
                           data={products}
                           field="vendor_id"
                           collection={vendors}
                           />
                        }
                        width={100}
                    />
                    <Column
                        header={<Cell>Status</Cell>}
                        cell={<TextCell data={products} field="status" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Code</Cell>}
                        cell={<TextCell data={products} field="code" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Cost</Cell>}
                        cell={<TextCell data={products} field="cost" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Action</Cell>}
                        cell={
                        <ActionsCell
                             data={products}
                             eventEdit={this.eventEditProduct}
                             eventDelete={this.eventDeleteProduct}
                             field="id"
                        />}
                        width={200}
                    />
                </Table>
                }
            </div>
        );
    }
}

ProductsTable.propTypes = {
    products: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        products: state.products || []
    };
};

export default connect(
    mapStateToProps
)(ProductsTable);
