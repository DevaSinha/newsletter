import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { List } from './list.entity';
import { Organization } from './organization.entity';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column('text')
    content: string;

    @ManyToOne(() => List, (list) => list.id, {eager: true})
    list: List;

    @ManyToOne(() => Organization, (organization) => organization.id, {eager: true})
    organization: Organization;

    @CreateDateColumn()
    created_at: Date;
}
