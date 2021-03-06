import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin
} from "sequelize";

export interface IPassProps {
    id?: string;
    name: string;
    price: number;
    route: string;
    day_start_validation: string;
    day_end_validation: string;
    space_now: string;
    valid: boolean
}

export interface IPassCreationProps extends Optional<IPassProps, "id"> {}

export interface PassInstance extends Model<IPassProps, IPassCreationProps>, IPassProps {}

export default function (sequelize: Sequelize): ModelCtor<PassInstance> {
    return sequelize.define<PassInstance>("Pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.BIGINT
        },
        route: {
            type: DataTypes.STRING
        },
        day_start_validation: {
            type: DataTypes.STRING
        },
        day_end_validation: {
            type: DataTypes.STRING
        },
        space_now: {
            type: DataTypes.STRING
        },
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: '0'
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}