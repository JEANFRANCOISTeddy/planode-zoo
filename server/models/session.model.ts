import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {UserInstance} from "./user.model";
import {ZooInstance} from "./zoo.model";

export interface SessionProps {
    id: number;
    token: string;
}

export interface SessionCreationProps extends Optional<SessionProps, "id"> { }

export interface SessionInstance extends Model<SessionProps, SessionCreationProps>, SessionProps {
    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;

    setZoo: BelongsToSetAssociationMixin<ZooInstance, "id">;
    getZoo: BelongsToGetAssociationMixin<ZooInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<SessionInstance> {
    return sequelize.define<SessionInstance>("Session", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}