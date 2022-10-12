import { useAsync } from 'rc-hooks';
import { useParams } from 'react-router-dom';
import KeepAlive from 'react-activation';
import PageContainer from '@/components/PageContainer';
import { getReposByName } from '@/services/repos';

const DetailPage = () => {
  const { name } = useParams();
  const { data, loading } = useAsync(() => getReposByName(name!).then(res => res.data));

  return (
    <PageContainer>
      <div style={{ padding: 15 }}>
        {loading && (
          <div style={{ padding: 50, display: 'flex', justifyContent: 'center', color: 'gray' }}>
            详情页数据请求中...
          </div>
        )}
        {!loading && data && (
          <div>
            <h2>{data.full_name}</h2>
            <p>{data.description}</p>
            <p>
              链接：
              <a href={data?.html_url} target="_blank" rel="noreferrer">
                {data.html_url}
              </a>
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

const WrapperDetailPage = (props: any) => {
  const { name } = useParams();

  return (
    <KeepAlive name="detail" id={name}>
      <DetailPage {...props} />
    </KeepAlive>
  );
};

export default WrapperDetailPage;
