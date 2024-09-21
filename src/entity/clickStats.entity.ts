import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity()
export class ClickStats {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Campaign, (campaign) => campaign.id)
    campaign: Campaign;

    @Column()
    link: string;

    @Column('int')
    click_count: number;

    @CreateDateColumn()
    created_at: Date;
}
