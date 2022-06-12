import { gql } from '@apollo/client';

export const QUERY_LAUNCH_PAST_LIST = gql`
  query LaunchesPastList($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
        id
        mission_name
        launch_date_local
            launch_site {
            site_name_long
        }
        links {
            article_link
            video_link
        }
        rocket {
            rocket_name
            rocket_type
        }
        launch_success
        details
    }
  }
`;